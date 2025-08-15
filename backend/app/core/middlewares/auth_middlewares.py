from fastapi import Request, HTTPException

from app.core.security.jwt import verify_access_token, refresh_access_token
from app.core.exceptions import AuthenticationException

UNPROTECTED_PATHS = [
    "/auth/login",
    "/auth/register",
    "/openapi.json",
    "/docs",
    "/docs/oauth2-redirect",
    "/redoc",
]

async def auth_middleware(request: Request, call_next):

    # -------------------------- Ignore paths and OPTIONS requests ------------------------->

    if request.url.path in UNPROTECTED_PATHS or request.method == "OPTIONS":
        return await call_next(request)
    
    # -------------------------- Get cookies --------------------------->

    refresh_token = request.cookies.get("refresh_token")
    access_token = request.cookies.get("access_token")

    # -------------------------- Check refresh token ------------------------->
    
    if not refresh_token:
        raise AuthenticationException("No refresh token provided")
    
    # ------------------------- Check access token and refresh if needed ----------------------------->

    if not access_token:
        try:
            refreshed = refresh_access_token(refresh_token)
            access_token = refreshed["access_token"]
            expire_time = refreshed["exp"]
            response = await call_next(request)
            response.set_cookie(
                key="access_token",
                value=access_token,
                expires=expire_time,
                httponly=True,
                secure=True,
                samesite="lax"
            )
            return response
        except HTTPException:
            raise AuthenticationException("Invalid refresh token")
    
    try:
        await verify_access_token(access_token)
        response = await call_next(request)
        return response
    
    except HTTPException:
        try:
            refreshed = refresh_access_token(refresh_token)
            access_token = refreshed["access_token"]
            expire_time = refreshed["exp"]
            response = await call_next(request)
            response.set_cookie(
                key="access_token",
                value=access_token,
                expires=expire_time,
                httponly=True,
                secure=True,
                samesite="lax"
            )
            return response
        except HTTPException:
            raise AuthenticationException("Failed to refresh access token")
        
# --------------------------------- Link with the main file --------------------------------->

def add_auth_handler(app):
    app.middleware("http")(auth_middleware)