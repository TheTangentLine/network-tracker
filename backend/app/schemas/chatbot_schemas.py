from pydantic import BaseModel

'''

    The Message history would not be store in the database

'''


class MessageRequest(BaseModel):
    previous_messages: list[str]
    message: str