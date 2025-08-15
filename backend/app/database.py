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

    # --------------------------- Base connection options ------------------------>
    
    connection_options: dict = {
        "serverSelectionTimeoutMS": 5000,
        "connectTimeoutMS": 10000,
        "socketTimeoutMS": 10000
    }

    # -------------------------------- Production ----------------------------->
    
    if settings.is_production and settings.MONGODB_CERT_FILE:
        connection_options.update({
            "tls": True,
            "tlsCertificateKeyFile": settings.MONGODB_CERT_FILE,
        })
    elif settings.is_production:
        connection_options.update({
            "tls": True,
        })

    # -------------------------------- Initialize -------------------------------->
    
    client = AsyncIOMotorClient(
        settings.mongodb_uri,  
        **connection_options
    )
    
    await init_beanie(
        database=client[settings.mongodb_db],  
        document_models=[
            User,
            Report
        ],
    )

# ----------------------- Close database -------------------->

async def close_db() -> None:
    if client:
        client.close()
