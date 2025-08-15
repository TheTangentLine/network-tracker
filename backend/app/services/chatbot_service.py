from fastapi import WebSocket

from groq import Groq
import asyncio
import json

from app.core.exceptions import *
from app.schemas.chatbot_schemas import *

from app.config import settings

# -------------------------- Bind API Key ------------------------->

client = Groq(api_key=settings.CHATBOT_API_KEY)

# ------------------------- Ask questions (Streaming) ---------------------------->

async def ask_questions_service(websocket: WebSocket, request: MessageRequest):
    try:

        # ---------------------------- Handling input token ---------------------------->

        if not request.message or not request.message.strip():
            await websocket.send_text(json.dumps({
                "type": "error",
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Message cannot be empty",
                    "status_code": 400
                }
            }))
            return

        list_previous_messages = request.previous_messages 

        if list_previous_messages:
            previous_conversation = "\n".join(list_previous_messages)
            if len(previous_conversation) > 1000:
                previous_conversation = previous_conversation[-1000:]
        else:
            previous_conversation = "No previous conversation."

        # ----------------------------------------- Prompt ------------------------------------->

        prompt = f"""
            You are an expert in Network in Computer Science. Please analyze and answer the following question in depth, but keep your response concise.

            Previous conversation context:
            {previous_conversation}

            Current question: {request.message}

            IMPORTANT INSTRUCTIONS:
            1. When the user asks about previous questions or conversation history, refer to the actual questions and responses shown in the conversation context above.
            2. If they ask "what is my previous question", look at the "User Question:" entries in the conversation history and tell them what their previous question was.
            3. If they ask "hi" or similar greetings, acknowledge the greeting and ask what they'd like to know about networks.

            Please provide a detailed analysis and answer based on the context and current question.
        """

        # --------------------------------------- Initialize ---------------------------------->

        try:
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

        except Exception as e:
            error_message = "Groq API error"
            if "rate limit" in str(e).lower() or "429" in str(e):
                error_message = "Chatbot service rate limit exceeded"
            elif "unauthorized" in str(e).lower() or "401" in str(e):
                error_message = "Groq API authentication failed"
            elif "timeout" in str(e).lower():
                error_message = "Groq API timeout"
            
            await websocket.send_text(json.dumps({
                "type": "error",
                "error": {
                    "code": "EXTERNAL_SERVICE_ERROR",
                    "message": error_message,
                    "status_code": 502
                }
            }))
            return
            
        # -------------------------------------- Send messages using web socket ----------------------------------->

        chunk_count = 0
        try:
            for chunk in completion:
                if websocket.client_state.value == 3:  
                    break
                    
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    chunk_count += 1
                               
                    await websocket.send_text(json.dumps({
                        "type": "content",
                        "content": content
                    }))

                    await asyncio.sleep(0.01)

        # ---------------------------------- Special handling errors ----------------------------------->

        except Exception as e:
            await websocket.send_text(json.dumps({
                "type": "error",
                "error": {
                    "code": "WEBSOCKET_ERROR",
                    "message": "WebSocket communication error",
                    "status_code": 500
                }
            }))
            return

        if websocket.client_state.value != 3: 
            try:
                await websocket.send_text(json.dumps({
                    "type": "complete"
                }))
            except Exception as e:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "error": {
                        "code": "WEBSOCKET_ERROR",
                        "message": "WebSocket completion error",
                        "status_code": 500
                    }
                }))
                return
            
    except Exception as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred",
                "status_code": 500
            }
        }))
        return