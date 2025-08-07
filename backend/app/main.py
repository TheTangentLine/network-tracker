from contextlib import asynccontextmanager
from fastapi import FastAPI

from .core.middlewares.cors import cors
from .core.middlewares.auth_middlewares import auth_middleware

from .config import settings
from .database import init_db, close_db

from .routers.auth_router import router as auth_router
from .routers.users_router import router as users_router
from .routers.reports_router import router as reports_router
from .routers.speed_router import router as speed_router
from .routers.chatbot_router import router as chatbot_router

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
cors(app)

# Authentication
app.middleware("http")(auth_middleware)


# ------------------------- Routers -------------------------->

# Include routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(reports_router)
app.include_router(speed_router)
app.include_router(chatbot_router)