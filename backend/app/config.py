from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, Field, SecretStr
from typing import List

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Network Tracker"
    DEBUG: bool = False

    # MongoDB (required)
    MONGODB_URI: str = Field(..., description="MongoDB connection URI")
    MONGODB_DB: str = Field(..., description="MongoDB database name")

    # Security (required)
    ACCESS_SECRET_KEY: SecretStr = Field(...)
    REFRESH_SECRET_KEY: SecretStr = Field(...)
    ALGORITHM: str = Field(...)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(...)
    REFRESH_TOKEN_EXPIRE_MINUTES: int = Field(...)

    # CORS (required)
    CORS_ORIGINS: str = Field(...)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

settings = Settings() # type: ignore 
