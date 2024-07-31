from django.db import models
import bcrypt

# Create your models here.
class Areas(models.Model):
    idareas = models.AutoField(db_column='idAreas', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    descripcion = models.TextField()

    class Meta:
        managed = False
        db_table = 'areas'

class Areaslogros(models.Model):
    idareaslogros = models.AutoField(db_column='idAreasLogros', primary_key=True)  # Field name made lowercase.
    resultado = models.TextField()
    idareas = models.IntegerField(db_column='idAreas')  # Field name made lowercase.
    idlogros = models.IntegerField(db_column='idLogros')  # Field name made lowercase.
    idusuario = models.IntegerField(db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'areaslogros'

class Datosmedicos(models.Model):
    iddatosmedicos = models.AutoField(db_column='idDatosMedicos', primary_key=True)  # Field name made lowercase.
    lugaratencion = models.TextField(db_column='lugarAtencion')  # Field name made lowercase.
    peso = models.TextField()
    estatura = models.TextField()
    idusuario = models.ForeignKey('Usuarios', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.
    ideps = models.ForeignKey('Eps', models.DO_NOTHING, db_column='idEps')  # Field name made lowercase.
    idrh = models.ForeignKey('Rh', models.DO_NOTHING, db_column='idRh')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'datosmedicos'

class Eps(models.Model):
    ideps = models.AutoField(db_column='idEps', primary_key=True)  # Field name made lowercase.
    nombreeps = models.TextField(db_column='nombreEps')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'eps'

class Historiaclinica(models.Model):
    idhistoriaclinica = models.AutoField(db_column='idHistoriaClinica', primary_key=True)  # Field name made lowercase.
    diagnostico = models.TextField()
    observaciones = models.TextField()
    medicamentos = models.TextField()
    cantidadmedicamentos = models.TextField(db_column='cantidadMedicamentos')  # Field name made lowercase.
    restriccionesalimenticias = models.TextField(db_column='restriccionesAlimenticias')  # Field name made lowercase.
    archivo = models.TextField()
    idusuario = models.IntegerField(db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'historiaclinica'

class Informe(models.Model):
    idinforme = models.AutoField(db_column='idInforme', primary_key=True)  # Field name made lowercase.
    nombreinforme = models.TextField(db_column='nombreInforme')  # Field name made lowercase.
    url = models.TextField()
    fecha = models.DateField()
    idusuario = models.IntegerField(db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'informe'

class Logros(models.Model):
    idlogros = models.AutoField(db_column='idLogros', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    tipo = models.TextField()
    comentario = models.TextField()

    class Meta:
        managed = False
        db_table = 'logros'

class Responsable(models.Model):
    idresponsable = models.AutoField(db_column='idResponsable', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    correo = models.TextField()
    numerodocumento = models.TextField(db_column='numeroDocumento')  # Field name made lowercase.
    telefono = models.TextField()
    profesion = models.TextField()
    ocupacion = models.TextField()
    empresa = models.TextField()
    idusuario = models.IntegerField(db_column='idUsuario')  # Field name made lowercase.
    idparentesco = models.IntegerField(db_column='idParentesco')  # Field name made lowercase.
    idtipodocumento = models.IntegerField(db_column='idTipoDocumento')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'responsable'


class Rh(models.Model):
    idrh = models.AutoField(db_column='idRh', primary_key=True)  # Field name made lowercase.
    tiporh = models.TextField(db_column='tipoRh')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rh'

class Rol(models.Model):
    idrol = models.AutoField(db_column='idRol', primary_key=True)  # Field name made lowercase.
    rol = models.TextField()

    class Meta:
        managed = False
        db_table = 'rol'

class Sexo(models.Model):
    idsexo = models.AutoField(db_column='idSexo', primary_key=True)  # Field name made lowercase.
    sexo = models.TextField()

    class Meta:
        managed = False
        db_table = 'sexo'

class Telefono(models.Model):
    idtelefono = models.AutoField(db_column='idTelefono', primary_key=True)  # Field name made lowercase.
    numero = models.TextField()
    estado = models.TextField()
    idusuario = models.IntegerField(db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'telefono'

class Tipodocumento(models.Model):
    idtipodocumento = models.AutoField(db_column='idTipoDocumento', primary_key=True)  # Field name made lowercase.
    tipodocumento = models.TextField(db_column='tipoDocumento')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipodocumento'

class Tipoparentesco(models.Model):
    idparentesco = models.AutoField(db_column='idParentesco', primary_key=True)  # Field name made lowercase.
    parentesco = models.TextField()

    class Meta:
        managed = False
        db_table = 'tipoparentesco'

class Usuarios(models.Model):
    idusuario = models.AutoField(db_column='idUsuario', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    numerodocumento = models.TextField(db_column='numeroDocumento')  # Field name made lowercase.
    comuna = models.TextField(blank=True, null=True)
    barrio = models.TextField()
    correo = models.TextField()
    urlimg = models.TextField(db_column='urlImg')  # Field name made lowercase.
    fecharegistro = models.DateField(db_column='fechaRegistro')  # Field name made lowercase.
    fechaingreso = models.DateField(db_column='fechaIngreso')  # Field name made lowercase.
    fechanacimiento = models.DateField(db_column='fechaNacimiento')  # Field name made lowercase.
    edad = models.TextField()
    institutoprocedencia = models.TextField(db_column='institutoProcedencia', blank=True, null=True)  # Field name made lowercase.
    direccion = models.TextField()
    idtipodocumento = models.IntegerField(db_column='idTipoDocumento')  # Field name made lowercase.
    idsexo = models.IntegerField(db_column='idSexo')  # Field name made lowercase.
    contrasena = models.TextField()
    cambiocontrasena = models.TextField(db_column='cambioContrasena')  # Field name made lowercase.
    estado = models.TextField()
    idrol = models.IntegerField(db_column='idRol')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'usuarios'
    
    def set_password(self, raw_password):
    #HASH DE CONTRASEÑA
        self.contrasena = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    #FUNCION QUE ME PERMITE VALIDAR MI CONTRASEÑA
    def check_password(self, raw_password):        
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.contrasena.encode('utf-8'))
 