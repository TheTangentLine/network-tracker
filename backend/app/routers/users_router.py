from fastapi import APIRouter, Depends

from app.schemas.users_schema import UserUpdate

from app.core.dependencies import get_user_service
from app.services.users_services import UserService

# --------------------- Router -------------------->

router = APIRouter(prefix="/users", tags=["users"])

# ------------------- Get user information ------------------->

@router.get("/{user_id}")
async def get_user(
    user_id: str,
    user_service: UserService = Depends(get_user_service)
):
    return await user_service.read_by_id(user_id)

# -------------------- Update user information ------------------->

@router.put("/update")
async def update_user(
    input: UserUpdate,
    user_service: UserService = Depends(get_user_service)
):
    return await user_service.update(input)