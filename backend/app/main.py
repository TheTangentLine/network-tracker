from contextlib import asynccontextmanager
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db, close_db

from .routers.users_router import router as users_router

# ------------------------- Lifespan ------------------------>

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()

# -------------------------- Initialize ----------------------->

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    lifespan=lifespan
)

# -------------------------- Middlewares ------------------------->

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------- Routers -------------------------->

# Include routers
app.include_router(users_router)