from pydantic import BaseModel, EmailStr, Field
from typing import Annotated

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
    username: Annotated[str, Field(min_length=3, max_length=50)]
    phone: Annotated[str, Field(min_length=10, max_length=15)]
    email: Annotated[EmailStr, Field()]
    password: Annotated[str, Field(min_length=6)]
    nationality: Annotated[str, Field()]

# ------------------------- Login ------------------------>

class UserLogin(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]  = ""
    password: Annotated[str, Field(min_length=6)]

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
    current_password: Annotated[str, Field(min_length=6)] 
    new_password: Annotated[str, Field(min_length=6)] 

# ------------------------ Delete ------------------------>

class UserDelete(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]  