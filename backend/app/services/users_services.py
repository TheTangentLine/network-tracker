from bson import ObjectId

from app.core.exceptions import (
    ConflictException,
    NotFoundException,
    ValidationException,
    handle_not_found_error,
    handle_validation_error,
    handle_database_error
)

from app.schemas.users_schema import UserRegister, UserRead, UserUpdate
from app.models.users_model import User
from app.repositories.user_repository import UserRepository
from app.core.security.hashing import hash_password, verify_password

class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    # ------------------------------ Create -------------------------------->

    async def create(self, input: UserRegister):
        try:
            if await self.user_repository.find_by_username(input.username):
                raise ConflictException(
                    detail="Username already exists",
                    resource="username"
                )
            
            if await self.user_repository.find_by_phone(input.phone):
                raise ConflictException(
                    detail="Phone number already exists",
                    resource="phone"
                )
            
            if await self.user_repository.find_by_email(input.email):
                raise ConflictException(
                    detail="Email already exists",
                    resource="email"
                )

            user = User(
                username=input.username,
                phone=input.phone,
                email=input.email,
                password=hash_password(input.password),
                nationality=input.nationality
            )

            await self.user_repository.create(user)
            return {"message": "User registered successfully"}
            
        except ConflictException:
            raise
        except Exception as e:
            raise handle_database_error(e, "create_user")

    # ------------------------------ Read ----------------------------->

    async def read_by_id(self, input: str):
        try:
            if not ObjectId.is_valid(input):
                raise handle_validation_error("user_id", "Invalid user ID format")
            
            user = await self.user_repository.find_by_id(input)
            if user is None:
                raise handle_not_found_error("User", input)
                
            return UserRead(
                username=user.username,
                email=user.email,
                phone=user.phone
            )
            
        except (ValidationException, NotFoundException):
            raise
        except Exception as e:
            raise handle_database_error(e, "read_user_by_id")

    # ------------------------------ Update --------------------------->

    async def update(self, input: UserUpdate):
        try:
            user = await self.user_repository.find_by_username(input.username)
            if user is None:
                raise handle_not_found_error("User", input.username)

            if not verify_password(input.current_password, user.password):
                raise ValidationException(
                    detail="Current password is incorrect",
                    field="current_password"
                )

            user.password = hash_password(input.new_password)
            await self.user_repository.update(user)
            return {"message": "User updated successfully"}
            
        except (NotFoundException, ValidationException):
            raise
        except Exception as e:
            raise handle_database_error(e, "update_user")