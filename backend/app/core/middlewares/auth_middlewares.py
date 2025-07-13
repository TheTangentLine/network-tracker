from fastapi import Request, Response, HTTPException

from app.core.security.jwt import verify_access_token, refresh_access_token

UNPROTECTED_PATHS = [
    "/auth/login",
    "/auth/register",
    "/auth/logout",
    "/openapi.json",
    "/docs",
    "/docs/oauth2-redirect",
    "/redoc",
]

async def auth_middleware(request: Request, call_next):

    if request.method.upper() == "OPTIONS":
        return await call_next(request)

    if request.url.path in UNPROTECTED_PATHS:
        return await call_next(request)

    refresh_token = request.cookies.get("refresh_token")
    access_token = request.cookies.get("access_token")

    response = Response("Unauthorized", status_code=401)
    
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if not access_token or not verify_access_token(access_token):
        refreshed = refresh_access_token(refresh_token)
        access_token = refreshed["access_token"]
        expire_time = refreshed["exp"]
        response = await call_next(request)
        response.set_cookie(
            key="access_token",
            value=access_token,
            expires=expire_time,
            httponly=True,
            secure=False,
            samesite="lax"
        )
        return response

    response = await call_next(request)
    return response