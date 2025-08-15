from fastapi import Request, status

from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

from app.core.exceptions import AppException, format_error_response

# ------------------------------- Logger configuration ------------------------------>

logger = logging.getLogger(__name__)

# ------------------------------- Main logic ------------------------------->

async def exception_handler_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    
    # ------------------------------ App exception -------------------------------->
        
    except AppException as e:
        logger.error(f"AppException caught: {e.detail}", extra={
            "error_code": e.error_code,
            "status_code": e.status_code,
            "context": e.context,
            "path": request.url.path,
            "method": request.method
        })
        
        return JSONResponse(
            status_code=e.status_code,
            content=format_error_response(e, include_context=True)
        )
    
    # ----------------------------- Request validation error --------------------------->
        
    except RequestValidationError as e:
        logger.error(f"Validation error: {str(e)}", extra={
            "path": request.url.path,
            "method": request.method
        })
        
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Request validation failed",
                    "status_code": status.HTTP_422_UNPROCESSABLE_ENTITY,
                    "details": e.errors()
                }
            }
        )
    
    # -------------------------- HTTP Exception ------------------------->
        
    except StarletteHTTPException as e:
        logger.error(f"HTTPException caught: {e.detail}", extra={
            "status_code": e.status_code,
            "path": request.url.path,
            "method": request.method
        })
        
        return JSONResponse(
            status_code=e.status_code,
            content={
                "error": {
                    "code": "HTTP_ERROR",
                    "message": e.detail,
                    "status_code": e.status_code
                }
            }
        )
        
    # ------------------------------ The rest ------------------------------>

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", extra={
            "path": request.url.path,
            "method": request.method,
            "error_type": type(e).__name__
        }, exc_info=True)
        
        error_message = "Internal server error"
        if request.app.debug:
            error_message = str(e)
        
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": {
                    "code": "INTERNAL_ERROR",
                    "message": error_message,
                    "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR
                }
            }
        )

# -------------------------------- Link with the main file ---------------------------->

def add_exception_handler(app):
    app.middleware("http")(exception_handler_middleware)
