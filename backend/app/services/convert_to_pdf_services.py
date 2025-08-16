from xhtml2pdf import pisa
import io
import os

from app.core.exceptions import (
    ValidationException,
    ExternalServiceException,
    handle_validation_error,
    handle_external_service_error
)

from app.schemas.reports_schema import *

from app.services.utils.network_assessment import *
from datetime import datetime

def convert_to_pdf(input: ReportRead):
    try:
        # -------------------------------- Validating input ------------------------------->

        if not input:
            raise handle_validation_error("input", "Network data is required")
        
        if input.network_data.ping is None or input.network_data.upload_mbps is None or input.network_data.download_mbps is None:
            raise handle_validation_error("input", "All network metrics are required")
        
        # -------------------------------- Assessment -------------------------------->

        assessment = assess_network(
            input.network_data.ping, 
            input.network_data.upload_mbps, 
            input.network_data.download_mbps
        )

        ping_assessment = assessment['ping']
        upload_assessment = assessment['upload']
        download_assessment = assessment['download']
        
        # -------------------------------- Casting data types of the input ------------------------->

        speed: str = str(input.network_data.ping)
        upload: str = str(input.network_data.upload_mbps)
        download: str = str(input.network_data.download_mbps)
        date: str = str(input.date)
        time: str = str(input.time)
        current_date: str = str(datetime.now())[0:19]

        # -------------------------------- HTML String ---------------------------->

        try:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            template_path = os.path.join(current_dir, "utils", "HTMLString.html") 
            
            with open(template_path, "r", encoding="utf-8") as file:
                html_template = file.read()
            
            html_string = html_template.replace("{date}", date)
            html_string = html_string.replace("{time}", time)
            html_string = html_string.replace("{current_date}", current_date)

            html_string = html_string.replace("{speed}", speed)
            html_string = html_string.replace("{upload}", upload)
            html_string = html_string.replace("{download}", download)

            html_string = html_string.replace("{ping_assessment}", ping_assessment)
            html_string = html_string.replace("{upload_assessment}", upload_assessment)
            html_string = html_string.replace("{download_assessment}", download_assessment)
            
        except FileNotFoundError:
            raise handle_validation_error("template_file", f"HTML template file not found at {template_path}") # type: ignore
        except Exception as e:
            print("Template processing error:", str(e))
            raise handle_validation_error("template_file", f"Error reading HTML template: {str(e)}")

        # --------------------------------- Generating PDF ---------------------------------->

        try:
            pdf_buffer = io.BytesIO()  
            pisa.CreatePDF(html_string, dest=pdf_buffer)            
            pdf_buffer.seek(0)
            return pdf_buffer.read()

        except Exception as e:
            print("PDF Generation Error:", str(e))
            if "memory" in str(e).lower():
                raise handle_external_service_error(e, "PDF generation memory error")
            elif "template" in str(e).lower():
                raise handle_validation_error("html_template", f"Invalid HTML template: {str(e)}")
            else:
                raise handle_external_service_error(e, "PDF generation")
            
    # -------------------------------- Raise errors ------------------------------------->

    except (ValidationException, ExternalServiceException):
        raise
    except Exception as e:
        raise handle_external_service_error(e, "PDF conversion service")