from fastapi import APIRouter, HTTPException

from app.models.users_model import *
from app.schemas.users_schema import *

from app.services.users_services import *

# ------------------------- Router ------------------------>

router = APIRouter(prefix="/users", tags=["users"])

# ------------------------- Create ------------------------->

@router.post("/create")
async def create_user(input: UserRegister):
    pass

# ------------------------- Read ------------------------->

@router.post("/read")
async def read_user(input: UserRead):
    pass

# ------------------------- Update ------------------------->

@router.put("/update")
async def update_user(input):
    pass

# ------------------------- Delete ------------------------->

@router.delete("/delete")
async def delete_user(input):
    pass