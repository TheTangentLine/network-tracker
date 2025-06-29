from fastapi import APIRouter, HTTPException

from app.models.users_model import *
from app.schemas.users_schema import *

from app.services.users_service import *

# ------------------------- Router ------------------------>

router = APIRouter(prefix="/users", tags=["users"])

# ------------------------- Register ------------------------->

@router.post("/register")
async def register_user(input: UserRegister):
    try:
        await register(input)
        return {"message": "User registered successfully"}
    except:
        raise HTTPException(status_code=400, detail="Failed to register user") 

# ------------------------- Login ------------------------->

@router.post("/login")
async def login_user(input: UserLogin):
    try:
        user_data = await login(input)
        return user_data
    except:
        raise HTTPException(status_code=400, detail="Failed to login")
    
# --------------------- Get current user ------------------>

@router.get("/me")
async def get_current_user():
    try:
        user_data = get_current()
    except:
        raise HTTPException(status_code=400, detail="Failed to get user data")