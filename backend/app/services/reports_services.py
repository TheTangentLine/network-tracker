import math
from fastapi import HTTPException
from bson import ObjectId
import pymongo

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
            upload_mbps=input.network_data.upload_mbps,
            download_mbps=input.network_data.download_mbps,
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



async def read_by_name(username: str, page: int, sortDate: str = "", sortMetric: str = "", dateStart: str = "", dateEnd: str = "", searchText: str = ""):
    LIMIT = 10
    number_offset = 10 * (page - 1)

    user = await User.find_one(User.username == username)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    user_id = str(user.id)

    # Base query for the user
    base_queries = Report.find(Report.user_id == user_id)

    # Search filter
    if searchText != '':
        base_queries = base_queries.find(
            {
                "$or": [
                    {"network_data.ping": {"$regex": searchText, "$options": "i"}},
                    {"network_data.upload_mbps": {"$regex": searchText, "$options": "i"}},
                    {"network_data.download_mbps": {"$regex": searchText, "$options": "i"}},
                    {"date": {"$regex": searchText, "$options": "i"}},
                    {"time": {"$regex": searchText, "$options": "i"}}
                ]
            }
        )

    # Date range filter
    if dateStart != '':
        base_queries = base_queries.find(Report.date >= dateStart)

    if dateEnd != '':
        base_queries = base_queries.find(Report.date <= dateEnd)

    # Sorting by Date (oldest or newest first)
    sort_params = []
    if sortDate:
        if sortDate == 'oldest':
            sort_params.append((Report.date, pymongo.ASCENDING))  # Ascending order for oldest first
            sort_params.append((Report.time, pymongo.ASCENDING))  # Ascending order for oldest first
        else:
            sort_params.append((Report.date, pymongo.DESCENDING))  # Descending order for newest first
            sort_params.append((Report.time, pymongo.DESCENDING))  # Ascending order for oldest first

    # Sorting by metrics (ping, upload, download)
    if sortMetric:
        if sortMetric == 'ping':
            sort_params.append((Report.network_data.ping, pymongo.DESCENDING))  # Descending order for ping
        elif sortMetric == 'upload':
            sort_params.append((Report.network_data.upload_mbps, pymongo.DESCENDING))  # Descending order for upload speed
        elif sortMetric == 'download':
            sort_params.append((Report.network_data.download_mbps, pymongo.DESCENDING))  # Descending order for download speed

    # Apply sorting
    if sort_params:
        base_queries = base_queries.sort(sort_params)

    # Count total users and calculate total pages
    total_users = await base_queries.count()
    total_pages = math.ceil(total_users / LIMIT)

    # Pagination: Skip offset and apply limit
    list_user = await base_queries.skip(number_offset).limit(LIMIT).to_list()

    return {
        "total_pages": total_pages,
        "list_user": list_user
    }



# ------------------------- Delete ------------------------->

async def delete(input: ReportDelete):
    
    # Validate ObjectId format for MongoDB
    if not ObjectId.is_valid(input.id):
        raise HTTPException(status_code=400, detail="Invalid report ID format")
    
    # Find the report by id and user_id
    report = await Report.find_one(
        Report.id == ObjectId(input.id)
    )
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    await report.delete()
    return {"message": "Report deleted successfully"}