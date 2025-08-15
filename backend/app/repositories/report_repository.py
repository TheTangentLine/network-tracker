from typing import Optional, List
from bson import ObjectId

from app.models.reports_model import Report

class ReportRepository:
    async def find_by_id(self, report_id: str) -> Optional[Report]:
        if not ObjectId.is_valid(report_id):
            return None
        return await Report.find_one(Report.id == ObjectId(report_id))
    
    async def find_by_user_id(self, user_id: str) -> List[Report]:
        if not ObjectId.is_valid(user_id):
            return []
        return await Report.find(Report.user_id == ObjectId(user_id)).to_list()
    
    async def find_all(self, skip: int = 0, limit: int = 100) -> List[Report]:
        return await Report.find().skip(skip).limit(limit).to_list()
    
    async def create(self, report: Report) -> Report:
        await report.insert()
        return report
    
    async def update(self, report: Report) -> Report:
        await report.save()
        return report
    
    async def delete(self, report: Report) -> bool:
        await report.delete()
        return True
