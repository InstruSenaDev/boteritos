from django.db import models
import bcrypt
# Create your models here.

class Tipodocumento(models.Model):
    idtipodocumento = models.AutoField(db_column='idTipoDocumento', primary_key=True)  # Field name made lowercase.
    tipodocumento = models.TextField(db_column='tipoDocumento')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipodocumento'

class Sexo(models.Model):
    idsexo = models.AutoField(db_column='idSexo', primary_key=True)  # Field name made lowercase.
    sexo = models.TextField()

    class Meta:
        managed = False
        db_table = 'sexo'

class Rh(models.Model):
    idrh = models.AutoField(db_column='idRh', primary_key=True)  # Field name made lowercase.
    rh = models.TextField()

    class Meta:
        managed = False
        db_table = 'rh'

class Rol(models.Model):
    idrol = models.AutoField(db_column='idRol', primary_key=True)  # Field name made lowercase.
    rol = models.TextField()

    class Meta:
        managed = False
        db_table = 'rol'

class Direccion(models.Model):
    iddireccion = models.AutoField(db_column='idDireccion', primary_key=True)  # Field name made lowercase.
    comuna = models.TextField()
    numero = models.TextField()
    barrio = models.TextField()

    class Meta:
        managed = False
        db_table = 'direccion'

class Datosmedicos(models.Model):
    iddatosmedicos = models.AutoField(db_column='idDatosMedicos', primary_key=True)  # Field name made lowercase.
    lugaratencion = models.TextField(db_column='lugarAtencion')  # Field name made lowercase.
    peso = models.TextField()
    altura = models.TextField()
    ideps = models.ForeignKey('Eps', models.DO_NOTHING, db_column='idEps')  # Field name made lowercase.
    idrh = models.ForeignKey('Rh', models.DO_NOTHING, db_column='idRh')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'datosmedicos'

class Usuario(models.Model):
    idusuario = models.AutoField(db_column='idUsuario', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    apellido = models.TextField()
    correo = models.TextField()
    contrasena = models.TextField()
    cambiocontrasena = models.TextField(db_column='cambioContrasena')  # Field name made lowercase.
    documento = models.TextField()
    estado = models.TextField()
    edad = models.TextField()
    iddireccion = models.ForeignKey(Direccion, models.DO_NOTHING, db_column='idDireccion')  # Field name made lowercase.
    idrol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='idRol')  # Field name made lowercase.
    iddatosmedicos = models.ForeignKey(Datosmedicos, models.DO_NOTHING, db_column='idDatosMedicos')  # Field name made lowercase.
    idsexo = models.ForeignKey(Sexo, models.DO_NOTHING, db_column='idSexo')  # Field name made lowercase.
    idtipodocumento = models.ForeignKey(Tipodocumento, models.DO_NOTHING, db_column='idTipoDocumento')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'usuario'
    
    def set_password(self, raw_password):
    #HASH DE CONTRASEÑA
        self.contrasena = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    #FUNCION QUE ME PERMITE VALIDAR MI CONTRASEÑA
    def check_password(self, raw_password):        
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.contrasena.encode('utf-8'))