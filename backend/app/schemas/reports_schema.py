from pydantic import BaseModel, Field
from typing import Annotated

'''

    Report schema would have those attributes:
        - User id
        - Ping
        - Upload speed
        - Download speed
        - Date
        - Time

'''

# ========================= Network Data =========================>

class NetworkData(BaseModel):
    ping: Annotated[float, Field(gt=0)]
    upload_mbps: Annotated[float, Field(gt=0)]
    download_mbps: Annotated[float, Field(gt=0)]

# ------------------------- Create ------------------------>

class ReportCreate(BaseModel):
    username: Annotated[str, Field()]
    network_data: NetworkData
    date: Annotated[str, Field(min_length=10, max_length=10)]  # Format YYYY-MM-DD
    time: Annotated[str, Field(min_length=5, max_length=5)]   # Format HH:MM


# ------------------------- Read ------------------------>

class ReportRead(BaseModel):
    user_id: Annotated[str, Field()]
    network_data: NetworkData
    date: Annotated[str, Field(min_length=10, max_length=10)]  # Format YYYY-MM-DD
    time: Annotated[str, Field(min_length=5, max_length=5)]   # Format HH:MM


# ------------------------- Delete ------------------------>

class ReportDelete(BaseModel):
    report_id: Annotated[str, Field()]  # MongoDB str as string
    user_id: Annotated[str, Field()]