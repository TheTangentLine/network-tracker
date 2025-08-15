from fastapi import APIRouter, WebSocket
import json
import asyncio

from app.schemas.chatbot_schemas import *
from app.services.chatbot_service import *

# --------------------- Router -------------------->

router = APIRouter(prefix='/chatbot', tags=['chatbot'])

# ------------------------- Ask ------------------------->

@router.websocket("/ask")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        
        data = await websocket.receive_text()
        request_data = json.loads(data)
        
        request = MessageRequest(
            previous_messages=request_data["previous_messages"], 
            message=request_data["message"]
        )

        await ask_questions_service(websocket, request)
        await asyncio.sleep(0.1)
        await websocket.close(code=1000)
        
    except Exception:
        try:
            await websocket.send_text(json.dumps({
                "type": "error",
                "error": {
                    "code": "INTERNAL_ERROR",
                    "message": "An unexpected error occurred",
                    "status_code": 500
                }
            }))
        except:
            pass
        finally:
            await websocket.close(code=1000)
