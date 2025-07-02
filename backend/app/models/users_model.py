from beanie import Document

class User(Document):
    username: str  # Unique
    phone: str     # Unique
    email: str     # Unique
    password: str
    nationality: str