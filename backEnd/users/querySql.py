from django.db import connection

def querySql(data):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM usuarios")
        row = cursor.fetchall()
        aña  = cursor.description
        print(aña)
        print("/////////////////////")
        
        columns = [col[0] for col in cursor.description]
        print(columns)
        
        print("/////////////////////////////////////////////////")
        print(row)
         
        print("/////////////////////////////////////////////////")
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        print(results)
        print("/////////////////////////////////////////////////")
        #row = cursor.fetchmany()
    return row