from bson import ObjectId
from fastapi import HTTPException

from app.schemas.users_schema import *
from app.models.users_model import User

from app.core.security.hashing import hash_password

# ------------------------- Create ------------------------->

async def create(input: UserRegister):
    # Check if username and email and phone are unique
    if await User.find_one(User.username == input.username):
        raise HTTPException(status_code=409, detail="Username has existed")
    
    if await User.find_one(User.phone == input.phone):
        raise HTTPException(status_code=409, detail="Phone number has existed")
    
    if await User.find_one(User.email == input.email):
        raise HTTPException(status_code=409, detail="Email has existed")

    # Create user
    user = User(
        username=input.username,
        phone=input.phone,
        email=input.email,
        password=hash_password(input.password),
        nationality=input.nationality
    )

    # Save user into database
    await user.insert()

    return {"message": "User registered successfully"}

# ------------------------- Read ------------------------->

async def read_by_id(input: str):
    # Validate ObjectId format
    if not ObjectId.is_valid(input):
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
    # Check if user exists
    user = await User.find_one(User.id == ObjectId(input))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserRead(
        username=user.username,
        email=user.email
    )

# ------------------------- Update ------------------------->

async def update(input: UserUpdate):
    # Check if user exists
    user = await User.find_one(User.username == input.username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Update user attributes
    user.phone = input.phone or user.phone
    user.email = input.email or user.email
    user.password = hash_password(input.password) if input.password else user.password
    user.nationality = input.nationality or user.nationality

    # Save user into database
    await user.save()

    return {"message": "User updated successfully"}

# ------------------------- Delete ------------------------->

async def delete(input: UserDelete):
    # Check if user exists
    user = await User.find_one(User.username == input.username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Delete user from database
    await user.delete()

    return {"message": "User deleted successfully"}