from pydantic import BaseModel, Field
from typing import Annotated

'''

    Report schema would have those attributes:
        - User id
        - Number of devices
        - Upload speed
        - Download speed
        - Latency
        - IP address
        - Date
        - Time

'''


# ========================= Router Data ========================>

class RouterData(BaseModel):
    number_of_devices: Annotated[int, Field(gt=0)]
    ip_address: Annotated[str, Field(min_length=7, max_length=15)] 

# ========================= Network Data =========================>

class NetworkData(BaseModel):
    upload_speed: Annotated[float, Field(gt=0)]
    download_speed: Annotated[float, Field(gt=0)]
    latency: Annotated[float, Field(gt=0)]

# ------------------------- Create ------------------------>

class ReportCreate(BaseModel):
    user_id: Annotated[str, Field()]
    router_data: RouterData
    network_data: NetworkData
    date: Annotated[str, Field(min_length=10, max_length=10)]  # Format YYYY-MM-DD
    time: Annotated[str, Field(min_length=5, max_length=5)]   # Format HH:MM


# ------------------------- Read ------------------------>

class ReportRead(BaseModel):
    user_id: Annotated[str, Field()]
    router_data: RouterData
    network_data: NetworkData
    date: Annotated[str, Field(min_length=10, max_length=10)]  # Format YYYY-MM-DD
    time: Annotated[str, Field(min_length=5, max_length=5)]   # Format HH:MM


# ------------------------- Delete ------------------------>

class ReportDelete(BaseModel):
    report_id: Annotated[str, Field()]  # MongoDB str as string
    user_id: Annotated[str, Field()]