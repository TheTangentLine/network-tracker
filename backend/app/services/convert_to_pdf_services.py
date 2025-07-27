from fastapi import HTTPException
from fastapi.responses import StreamingResponse
from xhtml2pdf import pisa
import io

from app.schemas.reports_schema import *

# Convert the data into a PDF using xhtml2pdf
def convert_to_pdf(input: NetworkData):
    speed: str = str(input.ping)
    upload: str = str(input.upload_mbps)
    download: str = str(input.download_mbps)

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

    try:
        pdf_buffer = io.BytesIO()  
        pisa.CreatePDF(html_string, dest=pdf_buffer)
        pdf_buffer.seek(0)
        return pdf_buffer.read()  

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))