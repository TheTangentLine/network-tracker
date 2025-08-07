from fastapi import APIRouter

from app.schemas.chatbot_schemas import *

from app.services.chatbot_service import *

# -------------------- Router ---------------------->

router = APIRouter(prefix='/chatbot', tags=['chatbot'])

# -------------------- Ask ----------------------->

@router.post('/ask')
def post_questions(request: MessageRequest):
    data = post_questions_service(request)
    return {"text": data}