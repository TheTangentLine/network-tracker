from fastapi import APIRouter, UploadFile
from fastapi.responses import StreamingResponse

from app.services.speed_services import upload_speed, generate_data

# --------------------- Router -------------------->

router = APIRouter(prefix='/speed', tags=['internet speed'])

# --------------------- Ping ------------------>

@router.get("/ping")
async def ping():
    return {"ping": "pong"}

# --------------------- Upload ---------------->

@router.post("/upload")
async def check_upload_speed(file: UploadFile):
    return await upload_speed(file)

# --------------------- Download --------------------->

@router.post("/download")
async def check_download_speed():
    return StreamingResponse(generate_data(), media_type="application/octet-stream")

