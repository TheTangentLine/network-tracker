from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import logging

from app.config import settings

# ----------------------------- Logger configuration ------------------------->

logger = logging.getLogger(__name__)

# -------------------------------- CSP Configs -------------------------------->

CSP_CONFIGS = {
    "development": (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; "  # Allows eval() and inline scripts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; "     # Allows inline styles
        "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; "                         # External fonts
        "img-src 'self' data: https: http:; "                                                          # Allows HTTP images
        "connect-src 'self' https: wss: http://localhost:*; "                                          # Allows localhost connections
        "frame-ancestors 'none'; "
        "form-action 'self'; "
        "base-uri 'self'; "
        "object-src 'none'; "
        "media-src 'self' https:; "
        "worker-src 'self' blob:; "                                                                    # Allows blob workers
        "frame-src 'self' https:; "
        "manifest-src 'self'; "
        "upgrade-insecure-requests;"
    ),
    "production": (
        # Production: Balanced security and functionality
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "                                 # No eval(), but allows inline
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "                              # Allows inline styles
        "font-src 'self' https://fonts.gstatic.com; "                                                   # Only trusted fonts
        "img-src 'self' data: https:; "                                                                 # Only HTTPS images
        "connect-src 'self' https: wss:; "                                                              # Only secure connections
        "frame-ancestors 'none'; "
        "form-action 'self'; "
        "base-uri 'self'; "
        "object-src 'none'; "
        "media-src 'self' https:; "
        "worker-src 'self'; "                                                                           # No blob workers
        "frame-src 'self' https:; "
        "manifest-src 'self'; "
        "upgrade-insecure-requests;"
    ),
}

# -------------------------------- Get CSP Policy ---------------------------------->

def get_csp_policy(environment: str = "development") -> str:
    policy = CSP_CONFIGS.get(environment, CSP_CONFIGS["development"])
    
    return policy

# ------------------------------- Main logic ------------------------------------>

class SecurityHeadersMiddleware(BaseHTTPMiddleware):

    def __init__(self, app, **kwargs):
        super().__init__(app, **kwargs)
        
        csp_policy = get_csp_policy(settings.ENVIRONMENT)
        
        self.security_headers = {}
        
        if settings.ENABLE_HSTS:
            self.security_headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
        
        if settings.ENABLE_CSP:
            self.security_headers["Content-Security-Policy"] = csp_policy
        
        if settings.ENABLE_X_FRAME_OPTIONS:
            self.security_headers["X-Frame-Options"] = "DENY"
        
        if settings.ENABLE_X_CONTENT_TYPE_OPTIONS:
            self.security_headers["X-Content-Type-Options"] = "nosniff"
        
        self.security_headers["X-XSS-Protection"] = "1; mode=block"
        self.security_headers["Referrer-Policy"] = "strict-origin-when-cross-origin"     
        self.security_headers["Permissions-Policy"] = (
            "accelerometer=(), "
            "ambient-light-sensor=(), "
            "autoplay=(), "
            "battery=(), "
            "camera=(), "
            "cross-origin-isolated=(), "
            "display-capture=(), "
            "document-domain=(), "
            "encrypted-media=(), "
            "execution-while-not-rendered=(), "
            "execution-while-out-of-viewport=(), "
            "fullscreen=(), "
            "geolocation=(), "
            "gyroscope=(), "
            "keyboard-map=(), "
            "magnetometer=(), "
            "microphone=(), "
            "midi=(), "
            "navigation-override=(), "
            "payment=(), "
            "picture-in-picture=(), "
            "publickey-credentials-get=(), "
            "screen-wake-lock=(), "
            "sync-xhr=(), "
            "usb=(), "
            "web-share=(), "
            "xr-spatial-tracking=()"
        )
        self.security_headers["Cache-Control"] = "no-store, no-cache, must-revalidate, proxy-revalidate"
        self.security_headers["Pragma"] = "no-cache"
        self.security_headers["Expires"] = "0"
        
        self.api_headers = {
            "Content-Type": "application/json",
            "X-API-Version": "1.0",
        }
        self.static_headers = {
            "Cache-Control": "public, max-age=31536000, immutable",
        }
        self.html_headers = {
            "Content-Type": "text/html; charset=utf-8",
        }

    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        content_type = response.headers.get("content-type", "")
        path = request.url.path
        
        for header, value in self.security_headers.items():
            response.headers[header] = value
        
        if "application/json" in content_type:
            for header, value in self.api_headers.items():
                response.headers[header] = value
                
        elif "text/html" in content_type:
            for header, value in self.html_headers.items():
                response.headers[header] = value
                
        elif any(ext in path for ext in ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg']):
            for header, value in self.static_headers.items():
                response.headers[header] = value
        
        if path == "/auth/logout":
            pass
        
        if settings.DEBUG:
            logger.debug(f"Added security headers to {path}")
        
        return response
    
# ------------------------------------ Link with the main file ------------------------------------------>

def add_security_headers(app):
    app.add_middleware(SecurityHeadersMiddleware)
    
    @app.middleware("http")
    async def custom_security_headers(request: Request, call_next):
        response = await call_next(request)
        
        path = request.url.path
        
        if path.startswith("/api") or path.startswith("/auth"):
            response.headers["X-API-Endpoint"] = path
            # Fix: Use hasattr to check if request_id exists in state
            request_id = getattr(request.state, "request_id", "unknown")
            response.headers["X-Request-ID"] = str(request_id)
        
        if request.method == "OPTIONS":
            response.headers["Access-Control-Max-Age"] = "86400"
        
        return response
