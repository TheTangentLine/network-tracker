from passlib.context import CryptContext

from app.config import settings

# -------------------- Handling Context ---------------------->

pwd_context = CryptContext(schemes=[settings.HASHING])

# -------------------- Hashing password ----------------------->

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# -------------------- Verifying password --------------------->

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)