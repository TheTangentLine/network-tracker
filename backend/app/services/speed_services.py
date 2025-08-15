from fastapi import UploadFile
import asyncio
import os

from app.core.exceptions import (
    ValidationException,
    handle_validation_error,
    handle_external_service_error
)

# -------------------- Generate random files ------------------->

def generate_random_file(size_bytes: int) -> bytes:
    try:
        if size_bytes <= 0:
            raise handle_validation_error("size_bytes", "File size must be positive")
        return os.urandom(size_bytes)
    except Exception as e:
        raise handle_external_service_error(e, "file_generation")

# -------------------- Ping Test ---------------------->

async def measure_ping() -> float:
    try:
        return 25.0
    except Exception as e:
        raise handle_external_service_error(e, "ping_measurement")

# -------------------- Check upload speed ---------------------->

async def upload_speed(file: UploadFile):
    try:
        if not file:
            raise handle_validation_error("file", "Upload file is required")
        
        total_bytes = 0
        chunk_size = 1024 * 1024  
        
        while True:
            try:
                chunk = await file.read(chunk_size)
                if not chunk:
                    break
                total_bytes += len(chunk)
            except Exception as e:
                raise handle_external_service_error(e, "file_reading")
        
        return {
            "status": "uploaded",
            "bytes_received": total_bytes
        }
        
    except ValidationException:
        raise
    except Exception as e:
        raise handle_external_service_error(e, "upload_speed_measurement")

# -------------------- Check download speed --------------------->

async def download_speed():
    try:
        MB = 1024 * 1024
        chunk_size = 1 * MB  # 1MB chunks
        total_size = 10 * MB  # 10MB total
        
        chunk = os.urandom(chunk_size)
        bytes_sent = 0
        
        while bytes_sent < total_size:
            try:
                yield chunk
                bytes_sent += len(chunk)
                await asyncio.sleep(0.01)
            except Exception as e:
                raise handle_external_service_error(e, "download_streaming")
                
    except Exception as e:
        # Handle other errors
        raise handle_external_service_error(e, "download_speed_measurement")  

