from typing import Optional
from bson import ObjectId

from app.models.users_model import User

class UserRepository:
    async def find_by_username(self, username: str) -> Optional[User]:
        return await User.find_one(User.username == username)
    
    async def find_by_email(self, email: str) -> Optional[User]:
        return await User.find_one(User.email == email)
    
    async def find_by_phone(self, phone: str) -> Optional[User]:
        return await User.find_one(User.phone == phone)
    
    async def find_by_id(self, user_id: str) -> Optional[User]:
        if not ObjectId.is_valid(user_id):
            return None
        return await User.find_one(User.id == ObjectId(user_id))
    
    async def create(self, user: User) -> User:
        await user.insert()
        return user
    
    async def update(self, user: User) -> User:
        await user.save()
        return user
    
    async def delete(self, user: User) -> bool:
        await user.delete()
        return True
