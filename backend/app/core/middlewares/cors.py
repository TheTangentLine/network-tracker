from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

def add_cors_handler(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )