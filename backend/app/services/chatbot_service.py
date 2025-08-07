from groq import Groq
from fastapi import WebSocket
import asyncio
import json

from app.schemas.chatbot_schemas import *
from app.config import settings

# -------------------------- Bind API Key ------------------------->

client = Groq(api_key=settings.API_KEY)

# ------------------------- Ask questions (Streaming) ---------------------------->

async def ask_questions_service(websocket: WebSocket, request: MessageRequest):
    prompt = f"""You are an expert in Network in Computer Science, explain, answer and analyse the {request.message} in depth. Do not answer too long, just answer the question"""

    try:
        # Check if API key is configured
        if not settings.API_KEY or settings.API_KEY == "":
            await websocket.send_text(json.dumps({
                "type": "error",
                "content": "AI service is not configured. Please check API key settings."
            }))
            return

        completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True,  
            stop=None
        )

        chunk_count = 0
        for chunk in completion:
            # Check if connection is still open
            if websocket.client_state.value == 3:  # WebSocketState.DISCONNECTED
                break
                
            if chunk.choices[0].delta.content is not None:
                content = chunk.choices[0].delta.content
                chunk_count += 1
                
                try:
                    await websocket.send_text(json.dumps({
                        "type": "content",
                        "content": content
                    }))
                except Exception as e:
                    # Connection was closed by client
                    break
                
                # Small delay to prevent overwhelming the connection
                await asyncio.sleep(0.01)
        
        # Only send completion if connection is still open
        if websocket.client_state.value != 3:  # WebSocketState.DISCONNECTED
            await websocket.send_text(json.dumps({
                "type": "complete"
            }))
        
    except Exception as e:
        error_message = f"Error in AI service: {str(e)}"
        try:
            await websocket.send_text(json.dumps({
                "type": "error",
                "content": error_message
            }))
        except:
            # Connection already closed
            pass