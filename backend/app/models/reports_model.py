from beanie import Document
from bson import ObjectId


# ========================== Router Data ========================>

class RouterData(Document):
    number_of_devices: int
    ip_address: str

# ========================== Network Data =========================>

class NetworkData(Document):
    upload_speed: float
    download_speed: float
    latency: float

# ========================== Main model =========================>

class Report(Document):
    user_id: str 

    # Routers related
    router_data: RouterData  

    # Network related
    network_data: NetworkData  

    # Time related
    date: str
    time: str