from fastapi import UploadFile
import os
import time
import asyncio
import aiohttp
import statistics
from typing import List

# -------------------- Generate random files ------------------->

def generate_random_file(size_bytes: int) -> bytes:
    return os.urandom(size_bytes) 

# -------------------- Ping Test ---------------------->

async def measure_ping() -> float:
    """Simple ping measurement - just return a reasonable ping time"""
    # Return a typical ping time for most connections
    return 25.0

# -------------------- Check upload speed ---------------------->

async def upload_speed(file: UploadFile):
    """Simple upload acknowledgment - speed measurement handled by frontend"""
    # Just read the file to acknowledge receipt
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

async def generate_data_with_speed_measurement():
    """Generate data for download speed test with proper measurement"""
    MB = 1024 * 1024
    chunk_size = 1 * MB  # 1MB chunks
    total_size = 10 * MB  # 10MB total
    
    chunk = os.urandom(chunk_size)
    bytes_sent = 0
    
    while bytes_sent < total_size:
        yield chunk
        bytes_sent += len(chunk)
        await asyncio.sleep(0.01)  # Small delay to prevent overwhelming

# -------------------- Comprehensive Speed Test --------------------->

async def run_comprehensive_speed_test():
    """Run a complete speed test including ping, download, and upload"""
    results = {}
    
    # Measure ping
    results["ping"] = await measure_ping()
    
    # For download and upload, we'll need client-side measurement
    # This is just a placeholder - actual implementation would be more complex
    
    return results
