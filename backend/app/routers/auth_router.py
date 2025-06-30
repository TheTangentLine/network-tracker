from fastapi import APIRouter

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
async def login_user(input: UserLogin):
    user_data = await login(input)
    return user_data
    
# --------------------- Get current user ------------------>

@router.get("/me")
async def get_current_user(token: str):
    user_data = get_current(token)
    return user_data
    