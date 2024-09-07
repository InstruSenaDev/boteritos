from django.db import models
from django.contrib.auth.models import AbstractUser
import bcrypt

# Create your models here.

class Rol(models.Model):
    idrol = models.AutoField(db_column='idRol', primary_key=True)  # Field name made lowercase.
    rol = models.TextField()

    class Meta:
        managed = False
        db_table = 'rol'

class Usuario(AbstractUser):
    idusuario = models.AutoField(db_column='idUsuario', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    apellido = models.TextField()
    correo = models.TextField()
    contrasena = models.TextField(db_column='contrasena')
    cambiocontrasena = models.TextField(db_column='cambioContrasena')  # Field name made lowercase.
    documento = models.TextField(unique=True)
    estado = models.TextField()
    edad = models.TextField()
    idrol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='idRol')  # Field name made lowercase.
    
    class Meta:
        managed = False
        db_table = 'usuario'
    
    #FUNCION QUE ME PERMITE VALIDAR MI CONTRASEÑA
    def check_password(self, raw_password):        
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.contrasena.encode('utf-8'))