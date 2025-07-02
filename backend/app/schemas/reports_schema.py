from pydantic import BaseModel, Field
from typing import Annotated

from bson import ObjectId

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

# ------------------------- Create ------------------------>

class ReportCreate(BaseModel):
    user_id: Annotated[ObjectId, Field()]
    number_of_devices: Annotated[int, Field(gt=0)]
    upload_speed: Annotated[float, Field(gt=0)]
    download_speed: Annotated[float, Field(gt=0)]
    latency: Annotated[float, Field(gt=0)]
    date: Annotated[str, Field(min_length=10, max_length=10)]  # Format YYYY-MM-DD
    time: Annotated[str, Field(min_length=5, max_length=5)]   # Format HH:MM
    ip_address: Annotated[str, Field(min_length=7, max_length=15)]  # Format X.X.X.X

# ------------------------- Read ------------------------>

class ReportRead(BaseModel):
    user_id: Annotated[ObjectId, Field()]
    number_of_devices: Annotated[int, Field(gt=0)]
    upload_speed: Annotated[float, Field(gt=0)]
    download_speed: Annotated[float, Field(gt=0)]
    latency: Annotated[float, Field(gt=0)]
    date: Annotated[str, Field(min_length=10, max_length=10)]  # Format YYYY-MM-DD
    time: Annotated[str, Field(min_length=5, max_length=5)]   # Format HH:MM
    ip_address: Annotated[str, Field(min_length=7, max_length=15)]  # Format X.X.X.X

# ------------------------- Delete ------------------------>

class ReportDelete(BaseModel):
    report_id: Annotated[ObjectId, Field()]  # MongoDB ObjectId as string
    user_id: Annotated[ObjectId, Field()]