from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings

# ----------------- CORS Handler ------------------->

def cors(app: FastAPI):
    # Get CORS origins from settings, with fallback for development
    cors_origins = settings.CORS_ORIGINS if hasattr(settings, 'CORS_ORIGINS') else [
        "http://localhost:3000",
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )