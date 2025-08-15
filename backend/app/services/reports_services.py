import math
import pymongo
from bson import ObjectId

from app.core.exceptions import (
    NotFoundException,
    ValidationException,
    AuthenticationException,
    handle_not_found_error,
    handle_validation_error,
    handle_database_error
)

from app.repositories.user_repository import UserRepository
from app.repositories.report_repository import ReportRepository
from app.schemas.reports_schema import ReportCreate, ReportDelete
from app.models.reports_model import Report, NetworkData

class ReportService:
    def __init__(self, report_repository: ReportRepository, user_repository: UserRepository):
        self.report_repository = report_repository
        self.user_repository = user_repository

    # ------------------------------------ Create ------------------------------->

    async def create(self, input: ReportCreate):
        try:
            user = await self.user_repository.find_by_username(input.username)
            if not user:
                raise AuthenticationException("Username does not exist")
            
            model_network_data = NetworkData(
                ping=input.network_data.ping,
                upload_mbps=input.network_data.upload_mbps,
                download_mbps=input.network_data.download_mbps
            )
            
            data = Report(
                user_id=str(user.id),
                network_data=model_network_data,
                date=input.date,
                time=input.time,
            )
            
            await self.report_repository.create(data)
            return {"message": "Report created successfully"}
            
        except AuthenticationException:
            raise
        except Exception as e:
            raise handle_database_error(e, "create_report")
        
    # ------------------------------------ Read ----------------------------------->

    async def read_by_id(self, input: str):
        try:
            if not ObjectId.is_valid(input):
                raise handle_validation_error("report_id", "Invalid report ID format")
            
            report = await self.report_repository.find_by_id(input)
            if not report:
                raise handle_not_found_error("Report", input)
                
            return report
            
        except (ValidationException, NotFoundException):
            raise
        except Exception as e:
            raise handle_database_error(e, "read_report_by_id")

    async def read_all_by_id(self, input: str):
        try:
            if not ObjectId.is_valid(input):
                raise handle_validation_error("user_id", "Invalid user ID format")

            user_reports = await self.report_repository.find_by_user_id(input)
            if not user_reports:
                raise handle_not_found_error("Reports for user", input)
                
            return user_reports
            
        except (ValidationException, NotFoundException):
            raise
        except Exception as e:
            raise handle_database_error(e, "read_reports_by_user_id")

    async def read_by_username(self, username: str, page: int, sortDate: str = "", sortMetric: str = "", dateStart: str = "", dateEnd: str = "", searchText: str = ""):
        try:
            LIMIT = 10
            NUMBER_OFFSET = 10 * (page - 1)

            user = await self.user_repository.find_by_username(username)
            if not user:
                raise AuthenticationException("User not found")
            
            user_id = str(user.id)

            base_queries = Report.find(Report.user_id == user_id)

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

            if dateStart != '':
                base_queries = base_queries.find(Report.date >= dateStart)

            if dateEnd != '':
                base_queries = base_queries.find(Report.date <= dateEnd)

            sort_params = []
            if sortDate:
                if sortDate == 'oldest':
                    sort_params.append((Report.date, pymongo.ASCENDING)) 
                    sort_params.append((Report.time, pymongo.ASCENDING))  
                else:
                    sort_params.append((Report.date, pymongo.DESCENDING))  
                    sort_params.append((Report.time, pymongo.DESCENDING))  

            if sortMetric:
                if sortMetric == 'ping':
                    sort_params.append((Report.network_data.ping, pymongo.DESCENDING))  
                elif sortMetric == 'upload':
                    sort_params.append((Report.network_data.upload_mbps, pymongo.DESCENDING))  
                elif sortMetric == 'download':
                    sort_params.append((Report.network_data.download_mbps, pymongo.DESCENDING))  

            if sort_params:
                base_queries = base_queries.sort(sort_params)

            total_reports = await base_queries.count()
            total_pages = math.ceil(total_reports / LIMIT)

            list_reports = await base_queries.skip(NUMBER_OFFSET).limit(LIMIT).to_list()

            return {
                "total_pages": total_pages,
                "list_reports": list_reports
            }
            
        except AuthenticationException:
            raise
        except Exception as e:
            raise handle_database_error(e, "read_reports_by_username")

    # ----------------------------------- Delete --------------------------------->
    
    async def delete(self, input: ReportDelete):
        try:
            if not ObjectId.is_valid(input.id):
                raise handle_validation_error("report_id", "Invalid report ID format")
            
            report = await self.report_repository.find_by_id(input.id)
            if not report:
                raise handle_not_found_error("Report", input.id)
            
            await self.report_repository.delete(report)
            return {"message": "Report deleted successfully"}
            
        except (ValidationException, NotFoundException):
            raise
        except Exception as e:
            raise handle_database_error(e, "delete_report")