from fastapi import Response
from typing import Dict, Any

class CookieMiddleware:
    @staticmethod
    def set_auth_cookies(response: Response, access_token_data: Dict[str, Any], refresh_token_data: Dict[str, Any]):
        response.set_cookie(
            key="access_token",
            value=access_token_data['access_token'],
            expires=access_token_data["exp"],
            httponly=True,
            secure=True, 
            samesite="lax",  
        )

        response.set_cookie(
            key="refresh_token",    
            value=refresh_token_data['refresh_token'],
            expires=refresh_token_data["exp"],
            httponly=True,
            secure=True,  
            samesite="lax",  
        )

    @staticmethod
    def clear_auth_cookies(response: Response):
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
