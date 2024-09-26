import jwt
import pytz
from django.conf import settings
from datetime import datetime, timedelta

def CreateToken(id):
    
    utc_now = datetime.now(pytz.utc)

    payload = {
        'idusuario': id,
        'exp': utc_now + timedelta(seconds=settings.JWT_ACCESS_EXPIRATION_TIME),
        'iat': utc_now
    }
    
    token = jwt.encode(payload, settings.JWT_ACCESS_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    
    return token