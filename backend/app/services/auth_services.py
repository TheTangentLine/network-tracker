from app.core.exceptions import AuthenticationException, handle_authentication_error

from app.models.users_model import User
from app.schemas.users_schema import UserLogin, UserRead, UserRegister
from app.repositories.user_repository import UserRepository

from app.core.security.hashing import verify_password, hash_password
from app.core.security.jwt import create_access_token, create_refresh_token, verify_access_token

class AuthService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    # ------------------------------ Register ------------------------------->

    async def register(self, input_data: UserRegister):
        try:
            if await self.user_repository.find_by_username(input_data.username):
                raise AuthenticationException("Username already exists")
            
            if await self.user_repository.find_by_email(input_data.email):
                raise AuthenticationException("Email already exists")
            
            if await self.user_repository.find_by_phone(input_data.phone):
                raise AuthenticationException("Phone number already exists")

            user = User(
                username=input_data.username,
                phone=input_data.phone,
                email=input_data.email,
                password=hash_password(input_data.password),
                nationality=input_data.nationality
            )

            await self.user_repository.create(user)
            return {"message": "User registered successfully"}
        except Exception as e:
            raise e
        
    # ------------------------------ Login --------------------------------->

    async def login(self, input: UserLogin) -> dict:
        try:
            userName = await self.user_repository.find_by_username(input.username)
            userEmail = await self.user_repository.find_by_email(input.username)
            user = userName if userName is not None else userEmail

            if user is None:
                raise handle_authentication_error("Invalid username or email")

            if not verify_password(input.password, user.password):
                raise handle_authentication_error("Invalid password")
            
            payload = str(user.id)
            access_token = create_access_token(payload)
            refresh_token = create_refresh_token(payload)

            return {
                "access_token_data": access_token,
                "refresh_token_data": refresh_token,
                "user": user
            }
            
        except AuthenticationException:
            raise
        except Exception:
            raise handle_authentication_error("Login failed due to an unexpected error")
        
    # -------------------------------- Get basic information ------------------------------>

    async def get_current(self, token: str | None):
        try:
            if not token:
                raise handle_authentication_error("Authentication token is required")
            
            response_data = await verify_access_token(token)
            user_data = UserRead(**response_data).model_dump()
            return user_data
            
        except AuthenticationException:
            raise
        except Exception:
            raise handle_authentication_error("Failed to retrieve user information")