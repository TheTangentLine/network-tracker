from fastapi import Request, HTTPException
from typing import Dict, Tuple, Optional
import time
import asyncio
from collections import defaultdict
import logging

# ------------------------------- Logger configuration -------------------------------->

logger = logging.getLogger(__name__)

logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)
logging.getLogger("requests").setLevel(logging.WARNING)

# -------------------------------- Main logic ------------------------------------->

class RateLimiter:
    def __init__(self):
        self.rate_limit_data: Dict[str, list] = defaultdict(list)
        self.lock = asyncio.Lock()
    
    async def is_rate_limited(
        self, 
        client_id: str, 
        max_requests: int, 
        window_seconds: int
    ) -> Tuple[bool, Optional[int]]:
        async with self.lock:
            current_time = time.time()
            window_start = current_time - window_seconds
            
            self.rate_limit_data[client_id] = [
                (timestamp, count) 
                for timestamp, count in self.rate_limit_data[client_id] 
                if timestamp > window_start
            ]
            
            current_requests = sum(
                count for _, count in self.rate_limit_data[client_id]
            )
            
            is_limited = current_requests >= max_requests
            remaining = max(0, max_requests - current_requests)
            
            if not is_limited:
                self.rate_limit_data[client_id].append((current_time, 1))
            
            return is_limited, remaining

# --------------------------- Global rate limiter ------------------------->

rate_limiter = RateLimiter()

# --------------------------- Rate limit configurations ------------------------>

RATE_LIMIT_CONFIGS = {
    "auth": {
        "login": {"max_requests": 5, "window_seconds": 300},      # 5 attempts per 5 minutes
        "register": {"max_requests": 5, "window_seconds": 600},   # 3 attempts per 10 minutes
        "password_reset": {"max_requests": 3, "window_seconds": 3600},  # 3 attempts per hour
    },
    "api": {
        "default": {"max_requests": 100, "window_seconds": 60},   # 100 requests per minute
        "reports": {"max_requests": 50, "window_seconds": 60},    # 50 requests per minute
        "speed_test": {"max_requests": 10, "window_seconds": 60}, # 10 requests per minute
    }
}

# ----------------------------- Get client ID ----------------------------->

def get_client_id(request: Request) -> str:
    forwarded_for = request.headers.get("X-Forwarded-For")
    real_ip = request.headers.get("X-Real-IP")
    cf_connecting_ip = request.headers.get("CF-Connecting-IP")  # Cloudflare
    
    if cf_connecting_ip:
        return cf_connecting_ip
    elif real_ip:
        return real_ip
    elif forwarded_for:
        return forwarded_for.split(",")[0].strip()
    else:
        return request.client.host if request.client else "unknown"

# --------------------------- Rate limiting middleware ----------------------------->

async def rate_limit_middleware(request: Request, call_next):
    client_id = get_client_id(request)
    path = request.url.path
    method = request.method
    
    config_key = "default"
    endpoint_key = "default"
    
    if path.startswith("/auth"):
        config_key = "auth"
        if "/login" in path:
            endpoint_key = "login"
        elif "/register" in path:
            endpoint_key = "register"
        elif "/password-reset" in path or "/forgot-password" in path:
            endpoint_key = "password_reset"
        else:
            endpoint_key = "default"
    
    elif path.startswith("/api") or path.startswith("/"):
        config_key = "api"
        if "/reports" in path:
            endpoint_key = "reports"
        elif "/speed" in path:
            endpoint_key = "speed_test"
        else:
            endpoint_key = "default"
    
    config = RATE_LIMIT_CONFIGS.get(config_key, {}).get(endpoint_key, RATE_LIMIT_CONFIGS["api"]["default"])
    
    is_limited, remaining = await rate_limiter.is_rate_limited(
        client_id=f"{client_id}:{path}:{method}",
        max_requests=config["max_requests"],
        window_seconds=config["window_seconds"]
    )
    
    if is_limited:
        logger.warning(
            f"Rate limit exceeded for {client_id} on {path} "
            f"({config['max_requests']} requests per {config['window_seconds']}s)"
        )
        
        raise HTTPException(
            status_code=429,
            detail={
                "error": "Too Many Requests",
                "message": f"Rate limit exceeded. Maximum {config['max_requests']} requests per {config['window_seconds']} seconds.",
                "retry_after": config["window_seconds"],
                "remaining_requests": remaining
            }
        )
    
    response = await call_next(request)
    
    response.headers["X-RateLimit-Limit"] = str(config["max_requests"])
    response.headers["X-RateLimit-Remaining"] = str(remaining)
    response.headers["X-RateLimit-Reset"] = str(int(time.time() + config["window_seconds"]))
    
    return response

# ------------------------------ Specific endpoint rate limiting ----------------------------->

async def rate_limit_auth_endpoint(request: Request, endpoint_type: str):
    client_id = get_client_id(request)
    
    if endpoint_type not in RATE_LIMIT_CONFIGS["auth"]:
        return
    
    config = RATE_LIMIT_CONFIGS["auth"][endpoint_type]
    
    is_limited, remaining = await rate_limiter.is_rate_limited(
        client_id=f"{client_id}:auth:{endpoint_type}",
        max_requests=config["max_requests"],
        window_seconds=config["window_seconds"]
    )
    
    if is_limited:
        logger.warning(f"Auth rate limit exceeded for {client_id} on {endpoint_type}")
        raise HTTPException(
            status_code=429,
            detail={
                "error": "Too Many Requests",
                "message": f"Too many {endpoint_type} attempts. Please try again later.",
                "retry_after": config["window_seconds"]
            }
        )
    
# ------------------------------- Link with the main file ------------------------------>
    
def add_rate_limit_handler(app):
    app.middleware("http")(rate_limit_middleware)
