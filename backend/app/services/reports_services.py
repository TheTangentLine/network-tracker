import math
from fastapi import HTTPException
from bson import ObjectId

from app.schemas.reports_schema import *

from app.models.reports_model import *
from app.models.users_model import *

# ------------------------- Create ------------------------->

async def create(input: ReportCreate):
    
    user = await User.find_one(User.username == input.username)
    if not user:
        raise HTTPException(status_code=401, detail="Username does not exist")
    
    data = Report(
        user_id=str(user.id),
        network_data=NetworkData(
            ping=input.network_data.ping,
            upload_speed=input.network_data.upload_mbps,
            download_speed=input.network_data.download_mbps,
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

# Read by username and pagination
async def read_by_name(username: str, page: int):
    LIMIT = 10
    number_offset = 10 * (page - 1)

    user = await User.find_one(User.username == username)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    user_id = str(user.id)

    base_queries = Report.find(Report.user_id == user_id)

    total_users = await base_queries.count()
    total_pages = math.ceil(total_users / LIMIT)

    list_user = await base_queries.skip(number_offset).limit(LIMIT).to_list()

    return {
        "total_pages": total_pages,
        "list_user": list_user
    }


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