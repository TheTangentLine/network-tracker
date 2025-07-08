from fastapi import APIRouter

router = APIRouter(prefix='/speed')

@router.post("/download")
def check_download_speed():
    pass

@router.post("/upload")
def check_upload_speed():
    pass