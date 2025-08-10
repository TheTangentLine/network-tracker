from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .config import settings

from .models.users_model import User
from .models.reports_model import Report

# -------------------- Module level variable --------------------->

client: AsyncIOMotorClient | None = None

# ----------------------- Init database -------------------------->

async def init_db() -> None:
    global client
    
    # Prepare connection options
    connection_options = {
        "tls": True,
        "tlsCertificateKeyFile": settings.MONGODB_CERT_FILE,
        "serverSelectionTimeoutMS": 5000,
        "connectTimeoutMS": 10000,
        "socketTimeoutMS": 10000
    }
    
    # Configure MongoDB client with SSL and X.509 settings
    client = AsyncIOMotorClient(
        settings.MONGODB_URI,
        **connection_options
    )
    
    await init_beanie(
        database=client[settings.MONGODB_DB],
        document_models=[
            User,
            Report
        ],
    )

# ----------------------- Close database -------------------->

async def close_db() -> None:
    if client:
        client.close()
