from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json
import asyncio

from app.schemas.chatbot_schemas import *

from app.services.chatbot_service import *

# -------------------- Router ---------------------->

router = APIRouter(prefix='/chatbot', tags=['chatbot'])

# -------------------- Health Check ----------------------->

@router.get("/health")
def health_check():
    return {"status": "ok", "message": "Chatbot service is running"}

# -------------------- Ask (WebSocket Stream) ----------------------->

@router.websocket("/ask")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    # Wait for the first message
    data = await websocket.receive_text()
    request_data = json.loads(data)
    
    request = MessageRequest(
        previous_messages=request_data["previous_messages"], 
        message=request_data["message"]
    )
    
    # Stream the response
    await ask_questions_service(websocket, request)
    
    # Keep connection open for a moment to ensure all data is sent
    await asyncio.sleep(0.1)
    
    await websocket.close(code=1000)
