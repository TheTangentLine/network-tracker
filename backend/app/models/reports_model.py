from beanie import Document
from bson import ObjectId

class Report(Document):
    user_id: ObjectId  

    # Routers related
    number_of_devices: int

    # Network related
    upload_speed: float
    download_speed: float
    latency: float
    ip_address: str

    # Time related
    date: str
    time: str