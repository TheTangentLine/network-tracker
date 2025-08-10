from fastapi import UploadFile
import os
import asyncio

# -------------------- Generate random files ------------------->

def generate_random_file(size_bytes: int) -> bytes:
    return os.urandom(size_bytes) 

# -------------------- Ping Test ---------------------->

async def measure_ping() -> float:
    return 25.0

# -------------------- Check upload speed ---------------------->

async def upload_speed(file: UploadFile):
    total_bytes = 0
    chunk_size = 1024 * 1024  # 1MB chunks
    
    while True:
        chunk = await file.read(chunk_size)
        if not chunk:
            break
        total_bytes += len(chunk)
    
    return {
        "status": "uploaded",
        "bytes_received": total_bytes
    }

# -------------------- Check download speed --------------------->

async def download_speed():
    MB = 1024 * 1024
    chunk_size = 1 * MB  # 1MB chunks
    total_size = 10 * MB  # 10MB total
    
    chunk = os.urandom(chunk_size)
    bytes_sent = 0
    
    while bytes_sent < total_size:
        yield chunk
        bytes_sent += len(chunk)
        await asyncio.sleep(0.01)  

