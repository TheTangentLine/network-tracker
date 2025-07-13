from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .config import settings

from .models.users_model import User
from .models.reports_model import Report, NetworkData

# -------------------- Module level variable --------------------->

client: AsyncIOMotorClient | None = None

# ----------------------- Init database -------------------------->

async def init_db() -> None:
    global client
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    await init_beanie(
        database=client[settings.MONGODB_DB],
        document_models=[
            User,
            Report,
            NetworkData
        ],
    )

# ----------------------- Close database -------------------->

async def close_db() -> None:
    if client:
        client.close()
