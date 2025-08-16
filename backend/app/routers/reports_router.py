from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
import io

from app.schemas.reports_schema import ReportCreate, ReportDelete, ReportRead

from app.core.dependencies import get_report_service
from app.services.reports_services import ReportService
from app.services.convert_to_pdf_services import convert_to_pdf as convert_to_pdf_service

# --------------------- Router -------------------->

router = APIRouter(prefix="/reports", tags=["reports"])

# ------------------------ Create -------------------------->

@router.post("/create")
async def create_report(
    input: ReportCreate,
    report_service: ReportService = Depends(get_report_service)
):
    return await report_service.create(input)

# --------------------------- Read ----------------------------->

@router.get("/read/{report_id}")
async def read_report(
    report_id: str,
    report_service: ReportService = Depends(get_report_service)
):
    return await report_service.read_by_id(report_id)

@router.get("/read/{user_id}/all")
async def read_all_reports(
    user_id: str,
    report_service: ReportService = Depends(get_report_service)
):
    return await report_service.read_all_by_id(user_id)

@router.get("/read")
async def read_by_username(
    username: str, 
    page: int, 
    sortDate: str = "", 
    sortMetric: str = "", 
    dateStart: str = "", 
    dateEnd: str = "", 
    searchText: str = "",
    report_service: ReportService = Depends(get_report_service)
):
    return await report_service.read_by_username(username, page, sortDate, sortMetric, dateStart, dateEnd, searchText)

# --------------------------- Delete ---------------------------->

@router.delete("/delete/{report_id}")
async def delete_report(
    report_id: str,
    report_service: ReportService = Depends(get_report_service)
):
    return await report_service.delete(ReportDelete(id=report_id))

# --------------------------- Convert to PDF ------------------------>

@router.post("/genpdf")
async def convert_to_pdf(input: ReportRead):
    pdf_bytes = convert_to_pdf_service(input)
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=network_report.pdf"}
    )