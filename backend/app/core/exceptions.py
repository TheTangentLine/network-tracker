from fastapi import HTTPException
from typing import Optional, Dict, Any

import logging

# ----------------------------- Logger configuration ------------------------->

logger = logging.getLogger(__name__)

# ------------------------- Custom Exceptions ------------------------>

class AppException(HTTPException):
    def __init__(
        self, 
        status_code: int, 
        detail: str, 
        error_code: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None
    ):
        super().__init__(status_code=status_code, detail=detail)
        self.error_code = error_code
        self.context = context or {}
        
        logger.error(
            f"AppException: {detail} (Code: {error_code}, Status: {status_code})",
            extra={
                "error_code": error_code,
                "status_code": status_code,
                "context": self.context
            }
        )


class ValidationException(AppException):
    def __init__(self, detail: str, field: Optional[str] = None):
        super().__init__(
            status_code=400,
            detail=detail,
            error_code="VALIDATION_ERROR",
            context={"field": field}
        )


class AuthenticationException(AppException):
    def __init__(self, detail: str = "Authentication failed"):
        super().__init__(
            status_code=401,
            detail=detail,
            error_code="AUTHENTICATION_ERROR"
        )


class AuthorizationException(AppException):
    def __init__(self, detail: str = "Access denied"):
        super().__init__(
            status_code=403,
            detail=detail,
            error_code="AUTHORIZATION_ERROR"
        )


class NotFoundException(AppException):
    def __init__(self, resource: str, identifier: Optional[str] = None):
        detail = f"{resource} not found"
        if identifier:
            detail += f" with identifier: {identifier}"
        
        super().__init__(
            status_code=404,
            detail=detail,
            error_code="NOT_FOUND",
            context={"resource": resource, "identifier": identifier}
        )


class ConflictException(AppException):
    def __init__(self, detail: str, resource: Optional[str] = None):
        super().__init__(
            status_code=409,
            detail=detail,
            error_code="CONFLICT",
            context={"resource": resource}
        )


class DatabaseException(AppException):
    def __init__(self, detail: str, operation: Optional[str] = None):
        super().__init__(
            status_code=500,
            detail=detail,
            error_code="DATABASE_ERROR",
            context={"operation": operation}
        )


class ExternalServiceException(AppException):
    def __init__(self, detail: str, service: Optional[str] = None):
        super().__init__(
            status_code=502,
            detail=detail,
            error_code="EXTERNAL_SERVICE_ERROR",
            context={"service": service}
        )


class RateLimitException(AppException):
    def __init__(self, detail: str = "Rate limit exceeded"):
        super().__init__(
            status_code=429,
            detail=detail,
            error_code="RATE_LIMIT_EXCEEDED"
        )

# ------------------------- Error Codes ------------------------>

ERROR_CODES = {
    "AUTH_INVALID_CREDENTIALS": "Invalid username or password",
    "AUTH_TOKEN_EXPIRED": "Authentication token has expired",
    "AUTH_TOKEN_INVALID": "Invalid authentication token",
    "AUTH_USER_NOT_FOUND": "User not found",
    "AUTH_INSUFFICIENT_PERMISSIONS": "Insufficient permissions",
    
    "VAL_INVALID_EMAIL": "Invalid email format",
    "VAL_INVALID_PHONE": "Invalid phone number format",
    "VAL_WEAK_PASSWORD": "Password does not meet security requirements",
    "VAL_INVALID_USERNAME": "Invalid username format",
    "VAL_REQUIRED_FIELD": "Required field is missing",
    
    "USER_ALREADY_EXISTS": "User already exists",
    "USER_NOT_FOUND": "User not found",
    "USER_UPDATE_FAILED": "Failed to update user",
    "USER_DELETE_FAILED": "Failed to delete user",
    
    "REPORT_NOT_FOUND": "Report not found",
    "REPORT_CREATE_FAILED": "Failed to create report",
    "REPORT_UPDATE_FAILED": "Failed to update report",
    "REPORT_DELETE_FAILED": "Failed to delete report",
    "REPORT_INVALID_ID": "Invalid report ID format",
    
    "SPEED_TEST_FAILED": "Speed test failed",
    "SPEED_TEST_INVALID_DATA": "Invalid speed test data",
    
    "CHATBOT_SERVICE_ERROR": "Chatbot service error",
    "CHATBOT_INVALID_REQUEST": "Invalid chatbot request",
    "CHATBOT_RATE_LIMITED": "Chatbot rate limit exceeded",
    
    "DB_CONNECTION_ERROR": "Database connection error",
    "DB_QUERY_ERROR": "Database query error",
    "DB_TRANSACTION_ERROR": "Database transaction error",
    
    "EXT_API_ERROR": "External API error",
    "EXT_SERVICE_UNAVAILABLE": "External service unavailable",
    "EXT_TIMEOUT": "External service timeout",
    
    "INTERNAL_ERROR": "Internal server error",
    "INVALID_REQUEST": "Invalid request",
    "RESOURCE_NOT_FOUND": "Resource not found",
    "OPERATION_FAILED": "Operation failed"
}

# ------------------------- Error Handler Functions ------------------------>

def handle_database_error(error: Exception, operation: str) -> DatabaseException | ConflictException:
    if "duplicate key" in str(error).lower():
        return ConflictException(
            detail="Resource already exists",
            resource="database_record"
        ) 
    elif "connection" in str(error).lower():
        return DatabaseException(
            detail="Database connection failed",
            operation=operation
        )
    else:
        return DatabaseException(
            detail="Database operation failed",
            operation=operation
        )

def handle_validation_error(field: str, message: str) -> ValidationException:
    return ValidationException(
        detail=message,
        field=field
    )

def handle_external_service_error(error: Exception, service: str) -> ExternalServiceException:
    if "timeout" in str(error).lower():
        return ExternalServiceException(
            detail="Service timeout",
            service=service
        )
    elif "unauthorized" in str(error).lower():
        return ExternalServiceException(
            detail="Service authentication failed",
            service=service
        )
    else:
        return ExternalServiceException(
            detail="External service error",
            service=service
        )

def handle_not_found_error(resource: str, identifier: Optional[str] = None) -> NotFoundException:
    return NotFoundException(
        resource=resource,
        identifier=identifier
    )

def handle_authentication_error(detail: str = "Authentication failed") -> AuthenticationException:
    return AuthenticationException(detail=detail)

def handle_authorization_error(detail: str = "Access denied") -> AuthorizationException:
    return AuthorizationException(detail=detail)

# ------------------------- Error Response Formatter ------------------------>

def format_error_response(
    error: AppException,
    include_context: bool = False
) -> Dict[str, Any]:
    response = {
        "error": {
            "code": error.error_code,
            "message": error.detail,
            "status_code": error.status_code
        }
    }
    
    if include_context and error.context:
        response["error"]["context"] = error.context
    
    return response
