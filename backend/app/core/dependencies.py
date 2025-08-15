from app.repositories.user_repository import UserRepository
from app.repositories.report_repository import ReportRepository

from app.services.auth_services import AuthService
from app.services.users_services import UserService
from app.services.reports_services import ReportService

# ---------------------- Inject Repositories ------------------->

def get_user_repository() -> UserRepository:
    return UserRepository()

def get_report_repository() -> ReportRepository:
    return ReportRepository()

# ---------------------- Inject Services --------------------->

def get_auth_service() -> AuthService:
    user_repo = get_user_repository()
    return AuthService(user_repo)

def get_user_service() -> UserService:
    user_repo = get_user_repository()
    return UserService(user_repo)

def get_report_service() -> ReportService:
    report_repo = get_report_repository()
    user_repo = get_user_repository()
    return ReportService(report_repo, user_repo)
