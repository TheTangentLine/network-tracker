from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

from typing import List

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Network Tracker"
    DEBUG: bool = False

    # MongoDB (required)
    MONGODB_URI: str = Field(..., description="MongoDB connection URI")
    MONGODB_DB: str = Field(..., description="MongoDB database name")
    
    # X.509 Certificate Authentication (optional)
    MONGODB_CERT_FILE: str = Field(default="", description="Path to X.509 certificate file")

    # JWT (required)
    ACCESS_SECRET_KEY: str = Field(...)
    REFRESH_SECRET_KEY: str = Field(...)
    ALGORITHM: str = Field(...)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(...)
    REFRESH_TOKEN_EXPIRE_MINUTES: int = Field(...)

    # HASHING
    HASHING: str = Field(...)

    # CHATBOT
    API_KEY: str = Field(...)

    # CORS (required)
    CORS_ORIGINS: List[str] = Field(...)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

settings = Settings() # type: ignore 
