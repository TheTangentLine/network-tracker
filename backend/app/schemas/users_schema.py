from pydantic import BaseModel, EmailStr, Field


'''

    User schema would have those attributes:
        - Username
        - Phone number
        - Email
        - Password
        - Nationality


'''

# ------------------------- Register ------------------------>

class UserRegister(BaseModel):
    username: str
    phone: str
    email: str
    password: str
    nationality: str

    class Config: 
        from_attributes = True

# ------------------------- Login ------------------------>

class UserLogin(BaseModel):
    username: str
    password: str

    class Config: 
        from_attributes = True

# ------------------------ Read -------------------------->

class UserRead(BaseModel):
    username: str
    email: str
    
    class Config: 
        from_attributes = True