def assess_network(ping: float, upload: float, download: float):
    ping_assessment: str = ''
    upload_assessment: str = ''
    download_assessment: str = ''

    if ping <= 20:
        ping_assessment = 'Very Good'
    elif ping <= 50:
        ping_assessment = 'Good'
    elif ping <= 100:
        ping_assessment = 'Medium'
    else:
        ping_assessment = 'Low'

    if upload >= 50:
        upload_assessment = 'Very Good'
    elif upload >= 20:
        upload_assessment = 'Good'
    elif upload >= 10:
        upload_assessment = 'Medium'
    else:
        upload_assessment = 'Low'

    if download >= 100:
        download_assessment = 'Very Good'
    elif download >= 50:
        download_assessment = 'Good'
    elif download >= 25:
        download_assessment = 'Medium'
    else:
        download_assessment = 'Low'

    return {
        "ping": ping_assessment,
        "upload": upload_assessment,
        "download": download_assessment
    }

