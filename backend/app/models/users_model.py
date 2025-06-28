from beanie import Document

class User(Document):
    username: str
    phone: int
    email: str
    password: str
    nationality: str