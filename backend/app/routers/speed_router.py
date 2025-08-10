from fastapi import APIRouter, UploadFile
from fastapi.responses import StreamingResponse

from app.services.speed_services import *

# --------------------- Router -------------------->

router = APIRouter(prefix='/speed', tags=['internet speed'])

# --------------------- Ping ------------------>

@router.get("/ping")
async def ping():
    return {"ping": await measure_ping()}
# --------------------- Upload ---------------->

@router.post("/upload")
async def check_upload_speed(file: UploadFile):
    return await upload_speed(file)

# --------------------- Download --------------------->

@router.post("/download")
async def check_download_speed():
    return StreamingResponse(
        download_speed(), 
        media_type="application/octet-stream"
    )


