from beanie import Document
from pydantic import BaseModel

# ========================== Network Data =========================>

class NetworkData(BaseModel):
    ping: float
    upload_speed: float
    download_speed: float

# ========================== Main model =========================>

class Report(Document):
    user_id: str

    # Network related
    network_data: NetworkData  

    # Time related
    date: str
    time: str