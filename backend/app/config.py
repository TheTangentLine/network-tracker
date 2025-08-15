from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, computed_field

from typing import List
import os

# =========================================================================================>

def get_env_file() -> str:
    env = os.getenv("ENVIRONMENT", "development")
    
    env_files = {
        "development": ".env.development",
        "production": ".env.production", 
    }
    
    env_file = env_files.get(env, ".env.development")
    
    if os.path.exists(env_file):
        return env_file
    else:
        return ".env"  
    
# =========================================================================================>

class Settings(BaseSettings):

    # --------------------------------- Basic information ---------------------------------->

    APP_NAME: str = "Network Tracker"
    DEBUG: bool = False
    ENVIRONMENT: str = Field(default="development", description="Environment (development/production)")

    # ------------------------------------ Database ----------------------------------->

    MONGODB_URI_DEV: str = Field(default="mongodb://localhost:27017", description="Development MongoDB URI")
    MONGODB_URI_PROD: str = Field(default="", description="Production MongoDB URI")

    MONGODB_DB_DEV: str = Field(default="network_tracker_dev", description="Development database name")
    MONGODB_DB_PROD: str = Field(default="network_tracker_prod", description="Production database name")
    
    MONGODB_URI: str = Field(default="", description="Legacy MongoDB URI (deprecated)")
    MONGODB_DB: str = Field(default="", description="Legacy database name (deprecated)")
    
    MONGODB_CERT_FILE: str = Field(
        default="", 
        description="Path to X.509 certificate file (only needed for production with client certificate auth)"
    )

    # --------------------------------- JWT and Hashing ---------------------------------->

    ALGORITHM: str = Field(...)

    ACCESS_SECRET_KEY: str = Field(...)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(...)

    REFRESH_SECRET_KEY: str = Field(...)
    REFRESH_TOKEN_EXPIRE_MINUTES: int = Field(...)

    HASHING: str = Field(...)

    # ---------------------------------  Chatbot API --------------------------------->

    CHATBOT_API_KEY: str = Field(...)

    # ---------------------------------- CORS ----------------------------->

    CORS_ORIGINS_DEV: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
        description="Development CORS origins"
    )

    CORS_ORIGINS_PROD: List[str] = Field(
        default=["https://yourdomain.com", "https://www.yourdomain.com"],
        description="Production CORS origins"
    )
    
    CORS_ORIGINS: List[str] = Field(default=[], description="Legacy CORS origins")

    # ---------------------------------- Security Header --------------------------------->

    ENABLE_HSTS: bool = Field(default=True, description="Enable HTTP Strict Transport Security")
    ENABLE_CSP: bool = Field(default=True, description="Enable Content Security Policy")
    ENABLE_X_FRAME_OPTIONS: bool = Field(default=True, description="Enable X-Frame-Options")
    ENABLE_X_CONTENT_TYPE_OPTIONS: bool = Field(default=True, description="Enable X-Content-Type-Options")

    # --------------------------------------------------------------------------- #
    #                        Function used by other files                         #
    # --------------------------------------------------------------------------- #

    @computed_field
    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == "production"

    @computed_field
    @property
    def is_development(self) -> bool:
        return self.ENVIRONMENT == "development"

    # --------------------------------- Database --------------------------------------->

    @computed_field
    @property
    def mongodb_uri(self) -> str:
        if self.ENVIRONMENT == "production":
            return self.MONGODB_URI_PROD or self.MONGODB_URI or "mongodb://localhost:27017"
        else:
            return self.MONGODB_URI_DEV or self.MONGODB_URI or "mongodb://localhost:27017"

    @computed_field
    @property
    def mongodb_db(self) -> str:
        if self.ENVIRONMENT == "production":
            return self.MONGODB_DB_PROD or self.MONGODB_DB or "network_tracker_prod"
        else:
            return self.MONGODB_DB_DEV or self.MONGODB_DB or "network_tracker_dev"
        
    # --------------------------------- CORS ---------------------------------------->

    @computed_field
    @property
    def cors_origins(self) -> List[str]:
        if self.ENVIRONMENT == "production":
            return self.CORS_ORIGINS_PROD if self.CORS_ORIGINS_PROD else self.CORS_ORIGINS
        else:
            return self.CORS_ORIGINS_DEV if self.CORS_ORIGINS_DEV else self.CORS_ORIGINS
        
    # ------------------------------------------------------------------------------->

    model_config = SettingsConfigDict(
        env_file=get_env_file(),
        env_file_encoding="utf-8",
        extra="ignore", 
    )

settings = Settings() # type: ignore 
