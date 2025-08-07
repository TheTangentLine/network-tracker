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
    
    try:
        # Wait for the first message
        data = await websocket.receive_text()
        request_data = json.loads(data)
        
        # Create MessageRequest object
        request = MessageRequest(message=request_data["message"])
        
        # Stream the response
        await ask_questions_service(websocket, request)
        
        # Keep connection open for a moment to ensure all data is sent
        await asyncio.sleep(0.1)
        
    except WebSocketDisconnect:
        pass
    except json.JSONDecodeError as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "content": f"Invalid JSON format: {str(e)}"
        }))
    except KeyError as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "content": f"Missing required field: {str(e)}"
        }))
    except Exception as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "content": f"Server error: {str(e)}"
        }))
    finally:
        # Ensure proper closure
        try:
            await websocket.close(code=1000)
        except:
            pass