from fastapi import UploadFile

import os
import time
import asyncio

# -------------------- Generate random files ------------------->

def generate_random_file(size_bytes: int) -> bytes:
    return os.urandom(size_bytes) 

# -------------------- Check upload speed ---------------------->

async def upload_speed(file: UploadFile):

    # Read the file in chunks asynchronously
    while await file.read(1024):
        pass

    return {"message": "done"}

# -------------------- Check download speed --------------------->

async def generate_data(mode):

    # Determine size of file
    size_mb = 10 if mode == 'slow' else 5

    # Generate random file
    MB = 1024 * 1024 # 1 mb = 1024 * 1024 bytes
    chunk = os.urandom(MB)  
    total_size = size_mb * MB  

    # Send chunk files - Maximum 5 times
    bytes_sent = 0
    while bytes_sent < total_size:
        yield chunk
        bytes_sent += len(chunk)
        await asyncio.sleep(0)  # Yield control back to the event loop
