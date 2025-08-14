from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.schemas.reports_schema import *

from app.services.reports_services import *
from app.services.convert_to_pdf_services import *

import io


# ------------------------- Router ------------------------->

router = APIRouter(prefix="/reports", tags=["reports"])

# ------------------------- Create ------------------------->

@router.post("/create")
async def create_report(input: ReportCreate):
    returned_report = await create(input)
    return returned_report

# ------------------------- Read --------------------------->

@router.get("/read/{report_id}")
async def read_report(report_id: str):
    report = await read_by_id(report_id)
    return report

@router.get("/read/{user_id}/all")
async def read_all_reports(user_id: str):
    reports = await read_all_by_id(user_id)
    return reports

@router.get("/read")
async def read_by_username(username: str, page: int, sortDate = "", sortMetric: str = "", dateStart: str = "", dateEnd: str = "", searchText: str = ""):
    reports = await read_by_name(username, page, sortDate, sortMetric, dateStart, dateEnd, searchText)
    return reports

# ------------------------- Delete ------------------------->

@router.delete("/delete/{report_id}")
async def delete_report(report_id: str):
    deleted_report = await delete(ReportDelete(id=report_id))
    return deleted_report

# --------------------- Convert to PDF ----------------------->

@router.post("/genpdf")
async def generate_pdf(input: NetworkData):
    file_returned = convert_to_pdf(input)
    return StreamingResponse(io.BytesIO(file_returned), media_type="application/pdf")