from typing import Optional
from beanie import Document
from bson import ObjectId

class User(Document):
    username: str
    phone: str
    email: str
    password: str
    nationality: str