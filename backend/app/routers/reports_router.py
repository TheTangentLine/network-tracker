from fastapi import APIRouter, HTTPException

from app.models.reports_model import Report
from app.schemas.reports_schema import *

from app.services.reports_services import *

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

# ------------------------- Delete ------------------------->

@router.delete("/delete")
async def delete_report(input: ReportDelete):
    deleted_report = await delete(input)
    return deleted_report