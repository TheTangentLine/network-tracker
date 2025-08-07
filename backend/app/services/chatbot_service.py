from groq import Groq

from app.schemas.chatbot_schemas import *
from app.config import settings

# -------------------------- Bind API Key ------------------------->

client = Groq(api_key=settings.API_KEY)

# ------------------------- Ask questions ---------------------------->

def post_questions_service(request: MessageRequest):

    prompt = f"""You are an expert in Network in Computer Science, explain, answer and analyse the {request.message} in depth, do not answer too long, just answer the question"""

    completion = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,  
        stop=None
    )

    message = completion.choices[0].message.content 

    return message