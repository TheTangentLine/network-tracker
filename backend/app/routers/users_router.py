from fastapi import APIRouter, HTTPException

from app.models.users_model import *
from app.schemas.users_schema import *

from app.services.users_services import *

# ------------------------- Router ------------------------>

router = APIRouter(prefix="/users", tags=["users"])

# ------------------------- Create ------------------------->

@router.post("/create")
async def create_user(input: UserRegister):
    created_user = await create(input)
    return created_user

# ------------------------- Read ------------------------->

@router.post("/read")
async def read_user(input: UserRead):
    user = await read_by_username(input)
    return user

# ------------------------- Update ------------------------->

@router.put("/update")
async def update_user(input: UserUpdate):
    updated_user = await update(input)
    return updated_user

# ------------------------- Delete ------------------------->

@router.delete("/delete")
async def delete_user(input: UserDelete):
    deleted_user = await delete(input)
    return deleted_user