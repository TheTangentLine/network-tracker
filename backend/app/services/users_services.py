from fastapi import HTTPException

from app.schemas.users_schema import *
from app.models.users_model import User

from app.core.security.hashing import verify_password, hash_password

# ------------------------- Create ------------------------->

async def register(input: UserRegister):
    pass

# ------------------------- Read ------------------------->

async def read(input: UserRead):
    pass

# ------------------------- Update ------------------------->

async def update(input):
    pass

# ------------------------- Delete ------------------------->

async def delete(input):
    pass