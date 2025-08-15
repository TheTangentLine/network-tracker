from xhtml2pdf import pisa
import io

from app.core.exceptions import (
    ValidationException,
    ExternalServiceException,
    handle_validation_error,
    handle_external_service_error
)

from app.schemas.reports_schema import *

def convert_to_pdf(input: NetworkData):
    try:
        # -------------------------------- Validating input ------------------------------->

        if not input:
            raise handle_validation_error("input", "Network data is required")
        
        if input.ping is None or input.upload_mbps is None or input.download_mbps is None:
            raise handle_validation_error("input", "All network metrics are required")
        
        # -------------------------------- Casting data types of the input ------------------------->

        speed: str = str(input.ping)
        upload: str = str(input.upload_mbps)
        download: str = str(input.download_mbps)

        # -------------------------------- HTML String ---------------------------->

        html_string = f'''
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Network Speed Details</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }}
                    .container {{
                        border: 1px solid #ccc;
                        padding: 20px;
                        width: 300px;
                        border-radius: 8px;
                        background-color: #f9f9f9;
                    }}
                    .title {{
                        text-align: center;
                        font-size: 20px;
                        margin-bottom: 10px;
                    }}
                    .info {{
                        margin: 5px 0;
                    }}
                    .info span {{
                        font-weight: bold;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="title">Network Speed Details</div>
                    <div class="info"><span>Speed:</span> {speed} ms</div>
                    <div class="info"><span>Upload:</span> {upload} Mbps</div>
                    <div class="info"><span>Download:</span> {download} Mbps</div>
                </div>
            </body>
            </html>
        '''

        # --------------------------------- Generating PDF ---------------------------------->

        try:
            pdf_buffer = io.BytesIO()  
            pisa.CreatePDF(html_string, dest=pdf_buffer)            
            pdf_buffer.seek(0)
            return pdf_buffer.read()

        except Exception as e:
            if "memory" in str(e).lower():
                raise handle_external_service_error(e, "PDF generation memory error")
            elif "template" in str(e).lower():
                raise handle_validation_error("html_template", "Invalid HTML template")
            else:
                raise handle_external_service_error(e, "PDF generation")
            
    # -------------------------------- Raise errors ------------------------------------->

    except (ValidationException, ExternalServiceException):
        raise
    except Exception as e:
        raise handle_external_service_error(e, "PDF conversion service")