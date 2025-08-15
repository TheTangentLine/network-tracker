from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Annotated
import re

'''

    User schema would have those attributes:
        - Username
        - Phone number
        - Email
        - Password
        - Nationality

'''

# ========================== Username Validation ==============================>

def validate_username(v):
    if not re.match(r'^[a-zA-Z0-9_]+$', v):
        raise ValueError("Username can only contain letters, numbers, and underscores")
    if v.lower() in ['admin', 'root', 'system', 'user', 'test']:
        raise ValueError("Username is not allowed")
    return v

# ========================== Phone Validation ==============================>

def validate_phone(v):
    if not re.match(r'^\+?[0-9]{10,15}$', v):
        raise ValueError("Phone number must contain only digits and optionally start with +")
    return v

# ========================== Password Validation ==============================>

def validate_password_strength(password: str) -> str:
    if len(password) < 12:
        raise ValueError("Password must be at least 12 characters long")
    
    if not re.search(r'[A-Z]', password):
        raise ValueError("Password must contain at least one uppercase letter")
    
    if not re.search(r'[a-z]', password):
        raise ValueError("Password must contain at least one lowercase letter")
    
    if not re.search(r'\d', password):
        raise ValueError("Password must contain at least one number")
    
    if not re.search(r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]', password):
        raise ValueError("Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)")
    
    return password

# ------------------------- Register ------------------------>

class UserRegister(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]
    phone: Annotated[str, Field(min_length=10, max_length=15)]
    email: Annotated[EmailStr, Field()]
    password: Annotated[str, Field(min_length=12)]
    nationality: Annotated[str, Field()]
    
    @field_validator('username')
    def validate_username(cls, v):
        return validate_username(v)
    
    @field_validator('phone')
    def validate_phone(cls, v):
        return validate_phone(v)
    
    @field_validator('password')
    def validate_password(cls, v):
        return validate_password_strength(v)

# ------------------------- Login ------------------------>

class UserLogin(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]
    password: Annotated[str, Field(min_length=12)]

# ------------------------ Read -------------------------->

class UserRead(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]  
    email: Annotated[EmailStr, Field()]
    phone: Annotated[str, Field(min_length=10, max_length=15)]

# ------------------------ Update ------------------------>

class UserUpdate(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]  
    email: Annotated[EmailStr, Field()]
    phone: Annotated[str, Field(min_length=10, max_length=15)] 
    current_password: Annotated[str, Field(min_length=12)] 
    new_password: Annotated[str, Field(min_length=12)]
    
    @field_validator('username')
    def validate_username(cls, v):
        return validate_username(v)
    
    @field_validator('phone')
    def validate_phone(cls, v):
        return validate_phone(v)
    
    @field_validator('new_password')
    def validate_new_password(cls, v):
        return validate_password_strength(v)

# ------------------------ Delete ------------------------>

class UserDelete(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]  