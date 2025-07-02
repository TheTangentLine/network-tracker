from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.schemas.reports_schema import *
from app.models.reports_model import *

# ------------------------- Create ------------------------->

async def create(input: ReportCreate):

    # Validate ObjectId format
    if not ObjectId.is_valid(input.user_id):
        raise HTTPException(status_code=400, detail="Invalid report ID format")
    
    data = Report(
        user_id=input.user_id,
        router_data=RouterData(
            number_of_devices=input.router_data.number_of_devices,
            ip_address=input.router_data.ip_address
        ),
        network_data=NetworkData(
            upload_speed=input.network_data.upload_speed,
            download_speed=input.network_data.download_speed,
            latency=input.network_data.latency
        ),
        date=input.date,
        time=input.time,
    )
    await data.insert()
    return {"message": "Report created successfully"}

# ------------------------- Read --------------------------->

# Read report by ID of the report
async def read_by_id(input: str):

    # Validate ObjectId format
    if not ObjectId.is_valid(input):
        raise HTTPException(status_code=400, detail="Invalid report ID format")
    
    # Check if report exists
    report = await Report.find_one(Report.id == ObjectId(input))
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


# Read all reports by user ID
async def read_all_by_id(input: str):

    # Validate ObjectId format
    if not ObjectId.is_valid(input):
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    # Check if user exists
    user_reports = await Report.find(Report.user_id == ObjectId(input)).to_list()
    if not user_reports:
        raise HTTPException(status_code=404, detail="No reports found for this user")
    return user_reports

# ------------------------- Delete ------------------------->

async def delete(input: ReportDelete):
    
    # Validate ObjectId format for MongoDB
    if not ObjectId.is_valid(input.report_id):
        raise HTTPException(status_code=400, detail="Invalid report ID format")
    if not ObjectId.is_valid(input.user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
    # Find the report by id and user_id
    report = await Report.find_one(
        Report.id == ObjectId(input.report_id),
        Report.user_id == ObjectId(input.user_id)
    )
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    await report.delete()
    return {"message": "Report deleted successfully"}