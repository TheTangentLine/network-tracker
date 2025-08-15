from fastapi import APIRouter, Request, Response, Depends

from app.core.middlewares.rate_limiter import rate_limit_auth_endpoint
from app.core.middlewares.cookie_middleware import CookieMiddleware

from app.schemas.users_schema import UserRegister, UserLogin

from app.core.dependencies import get_auth_service
from app.services.auth_services import AuthService

# ------------------------- Router ----------------------->

router = APIRouter(prefix="/auth", tags=["auth"])

# ------------------------ Register -------------------------->

@router.post("/register")
async def register_user(
    input: UserRegister, 
    request: Request,
    auth_service: AuthService = Depends(get_auth_service)
):
    await rate_limit_auth_endpoint(request, "register")
    return await auth_service.register(input)

# ------------------------- Login --------------------------->

@router.post("/login")
async def login_user(
    input: UserLogin, 
    response: Response, 
    request: Request,
    auth_service: AuthService = Depends(get_auth_service)
):
    await rate_limit_auth_endpoint(request, "login")
    
    returned_data = await auth_service.login(input)
    
    CookieMiddleware.set_auth_cookies(
        response, 
        returned_data["access_token_data"], 
        returned_data["refresh_token_data"]
    )

    return returned_data["user"]

# ------------------------ Logout ------------------------->

@router.post("/logout")
async def log_out(response: Response):
    CookieMiddleware.clear_auth_cookies(response)
    return {"message": "Logged out successfully"}

# ------------------------- Get basic information ---------------------->

@router.get("/me")
async def get_current_user(
    request: Request,
    auth_service: AuthService = Depends(get_auth_service)
):
    access_token = request.cookies.get("access_token")
    return await auth_service.get_current(access_token)