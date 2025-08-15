from fastapi import HTTPException

from app.models.users_model import User

from bson import ObjectId
from jose import jwt
from datetime import datetime, timedelta, timezone

from app.config import settings

# ------------------------- JWT Configuration ------------------------->

ALGORITHM=settings.ALGORITHM

ACCESS_SECRET_KEY=settings.ACCESS_SECRET_KEY
REFRESH_SECRET_KEY=settings.REFRESH_SECRET_KEY

ACCESS_TOKEN_EXPIRE_MINUTES=settings.ACCESS_TOKEN_EXPIRE_MINUTES
REFRESH_TOKEN_EXPIRE_MINUTES=settings.REFRESH_TOKEN_EXPIRE_MINUTES

# ------------------------ Access Token -------------------------------->

def create_access_token(input: str) -> dict:
    payload: dict = {"user_id": input}
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    payload.update({"exp": expire})
    access_token = jwt.encode(payload, ACCESS_SECRET_KEY, algorithm=ALGORITHM)

    return {
        "access_token": access_token,
        "exp": expire,
    }

async def verify_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
        user = await User.find_one(User.id == ObjectId(payload['user_id']))

        if user is None:
            raise HTTPException(status_code=401, detail="No user found")
        
        return user.model_dump()
    
    except HTTPException as e:
        raise e
    except :   
        raise HTTPException(status_code=401, detail="Invalid access token")

# ------------------------ Refresh Token ------------------------------>

def create_refresh_token(input: str) -> dict:
    payload: dict = {"user_id": input}
    expire = datetime.now(timezone.utc) + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)

    payload.update({"exp": expire})
    refresh_token = jwt.encode(payload, REFRESH_SECRET_KEY, algorithm=ALGORITHM)

    return {
        "refresh_token": refresh_token,
        "exp": expire,
    }

async def verify_refresh_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        user = await User.find_one(User.id == ObjectId(payload['user_id']))

        if user is None:
            raise HTTPException(status_code=401, detail="No user found")
        
        return user.model_dump()
    
    except HTTPException as e:
        raise e
    except:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
# ------------------------ Token Refresh ------------------------------>

def refresh_access_token(refresh_token: str) -> dict:
    try:
        payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload['user_id']
        
        new_access_token = create_access_token(user_id)
        return new_access_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")