from django.db import connection

def querySql(self):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM usuarios WHERE idUsuario = 2")
        row = cursor.fetchone()

    return row