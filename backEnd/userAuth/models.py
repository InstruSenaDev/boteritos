from django.db import models
import bcrypt

# Create your models here.

class Usuario(models.Model):
    idusuario = models.AutoField(db_column='idUsuario', primary_key=True)   
    nombre = models.TextField()
    apellido = models.TextField()
    correo = models.TextField()
    contrasena = models.TextField(db_column='contrasena')
    cambiocontrasena = models.TextField(db_column='cambioContrasena')   
    documento = models.TextField(unique=True)
    estado = models.TextField()
    edad = models.TextField()
    idrol = models.IntegerField(db_column='idRol')   
    
    class Meta:
        managed = False
        db_table = 'usuario'
    
    #FUNCION QUE ME PERMITE VALIDAR MI CONTRASEÑA
    def check_password(self, raw_password):        
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.contrasena.encode('utf-8'))