from groq import Groq
from fastapi import WebSocket
import pymongo
import asyncio
import json

from app.schemas.chatbot_schemas import *

from app.config import settings

# -------------------------- Bind API Key ------------------------->

client = Groq(api_key=settings.API_KEY)

# ------------------------- Ask questions (Streaming) ---------------------------->

async def ask_questions_service(websocket: WebSocket, request: MessageRequest):

    list_previous_messages = request.previous_messages 

    # Format previous messages in a more readable way
    if list_previous_messages:
        previous_conversation = "\n".join(list_previous_messages)
        # Limit the conversation history to prevent token overflow
        if len(previous_conversation) > 1000:
            previous_conversation = previous_conversation[-1000:]
    else:
        previous_conversation = "No previous conversation."


    prompt = f"""
You are an expert in Network in Computer Science. Please analyze and answer the following question in depth, but keep your response concise.

Previous conversation context:
{previous_conversation}

Current question: {request.message}

IMPORTANT INSTRUCTIONS:
1. When the user asks about previous questions or conversation history, refer to the actual questions and responses shown in the conversation context above.
2. If they ask "what is my previous question", look at the "User Question:" entries in the conversation history and tell them what their previous question was.
3. If they ask "hi" or similar greetings, acknowledge the greeting and ask what they'd like to know about networks.
4. Always reference the conversation context when relevant to provide contextual responses.

Please provide a detailed analysis and answer based on the context and current question.
"""

    try:
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
            if websocket.client_state.value == 3:  
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