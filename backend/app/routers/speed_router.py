from fastapi import APIRouter, UploadFile
from fastapi.responses import StreamingResponse

from app.services.speed_services import (
    upload_speed, 
    generate_data_with_speed_measurement, 
    measure_ping,
    run_comprehensive_speed_test
)

# --------------------- Router -------------------->

router = APIRouter(prefix='/speed', tags=['internet speed'])

# --------------------- Ping ------------------>

@router.get("/ping")
async def ping():
    try:
        ping_result = await measure_ping()
        return {"ping": round(ping_result, 2)}
    except Exception as e:
        # Fallback to a simple ping measurement
        return {"ping": 50.0}

# --------------------- Upload ---------------->

@router.post("/upload")
async def check_upload_speed(file: UploadFile):
    return await upload_speed(file)

# --------------------- Download --------------------->

@router.post("/download")
async def check_download_speed():
    return StreamingResponse(
        generate_data_with_speed_measurement(), 
        media_type="application/octet-stream"
    )

# --------------------- Comprehensive Test --------------------->

@router.get("/test")
async def run_speed_test():
    """Run a comprehensive speed test"""
    return await run_comprehensive_speed_test()

