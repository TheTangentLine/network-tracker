from fastapi import WebSocket

from groq import Groq
import asyncio
import json

from app.schemas.chatbot_schemas import *
from app.config import settings

# -------------------------- Bind API Key ------------------------->

client = Groq(api_key=settings.API_KEY)

# ------------------------- Ask questions (Streaming) ---------------------------->

async def ask_questions_service(websocket: WebSocket, request: MessageRequest):

    # Handle previous messages
    list_previous_messages = request.previous_messages 

    if list_previous_messages:
        previous_conversation = "\n".join(list_previous_messages)
        if len(previous_conversation) > 1000:
            previous_conversation = previous_conversation[-1000:]
    else:
        previous_conversation = "No previous conversation."


    # Chatbot configuration
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

    # Sending data
    chunk_count = 0
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
    

    if websocket.client_state.value != 3: 
        await websocket.send_text(json.dumps({
            "type": "complete"
        }))
    
