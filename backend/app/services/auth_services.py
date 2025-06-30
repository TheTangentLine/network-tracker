from fastapi import HTTPException

from app.schemas.users_schema import *
from app.models.users_model import User
from .users_services import create

from app.core.security.hashing import verify_password, hash_password
from app.core.security.jwt import create_access_token, create_refresh_token, verify_access_token

# ----------------------- Register ------------------------>

async def register(input: UserRegister):
    return await create(input)

# ----------------------- Login -------------------------->

async def login(input: UserLogin) -> dict:

    user = await User.find_one(User.username == input.username)

    # Check if username does not exist and if the password is not validated
    if user is None:
        raise HTTPException(status_code=401, detail="Username does not exist")
    if not verify_password(input.password, user.password):
        raise HTTPException(status_code=401, detail="Wrong password")
    
    payload = UserRead(username=user.username, email=user.email)
    access_token = create_access_token(payload)
    refresh_token = create_refresh_token(payload)

    return {
        "access_token_data": access_token,
        "refresh_token_data": refresh_token,
        "user": user
    }

# --------------------- Get current user ---------------->

def get_current(token: str):
    response_data = verify_access_token(token)
    user_data = UserRead(**response_data).model_dump()
    return user_data

