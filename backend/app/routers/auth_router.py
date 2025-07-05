from fastapi import APIRouter, Request, Response

from app.models.users_model import *
from app.schemas.users_schema import *

from app.services.auth_services import *


# ------------------------- Router ------------------------>

router = APIRouter(prefix="/auth", tags=["auth"])

# ------------------------- Register ------------------------->

@router.post("/register")
async def register_user(input: UserRegister):
    response = await register(input)
    return response

# ------------------------- Login ------------------------->

@router.post("/login")
async def login_user(input: UserLogin, response: Response):
    returned_data = await login(input)

    data_access = returned_data["access_token_data"]
    response.set_cookie(
        key="access_token",
        value=data_access['access_token'],
        expires=data_access["exp"],
        httponly=True,
        secure=True, 
        samesite="lax",  
    )

    data_refresh = returned_data["refresh_token_data"]
    response.set_cookie(
        key="refresh_token",    
        value=data_refresh['refresh_token'],
        expires=data_refresh["exp"],
        httponly=True,
        secure=True,  
        samesite="lax",  
    )

    return returned_data["user"]


# --------------------- Logout ---------------------------->

@router.post("/logout")
async def log_out(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

# --------------------- Get current user ------------------>

@router.get("/me")
async def get_current_user(request: Request):
    access_token = request.cookies.get("access_token")
    if not access_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_data = get_current(access_token)
    return user_data