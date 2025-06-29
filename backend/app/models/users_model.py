from beanie import Document

class User(Document):
    username: str
    phone: str
    email: str
    password: str
    nationality: str