from fastapi import FastAPI
from contextlib import asynccontextmanager

from .core.middlewares.exception_handler import add_exception_handler
from .core.middlewares.security_headers import add_security_headers
from .core.middlewares.rate_limiter import add_rate_limit_handler
from .core.middlewares.cors import add_cors_handler
from .core.middlewares.auth_middlewares import add_auth_handler

from .config import settings
from .database import init_db, close_db

from .routers.auth_router import router as auth_router
from .routers.users_router import router as users_router
from .routers.reports_router import router as reports_router
from .routers.speed_router import router as speed_router
from .routers.chatbot_router import router as chatbot_router

# -------------------------- Initialize ----------------------->

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    lifespan=lifespan
)

# -------------------------- Middlewares ------------------------->

add_exception_handler(app)
add_security_headers(app)
add_rate_limit_handler(app)
add_cors_handler(app)
add_auth_handler(app)

# ------------------------- Routers -------------------------->

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(reports_router)
app.include_router(speed_router)
app.include_router(chatbot_router)