# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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
    idareas = models.ForeignKey(Areas, models.DO_NOTHING, db_column='idAreas')  # Field name made lowercase.
    idlogros = models.ForeignKey('Logros', models.DO_NOTHING, db_column='idLogros')  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'areaslogros'


class AuthGroup(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigIntegerField(primary_key=True)
    group_id = models.IntegerField()
    permission_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group_id', 'permission_id'),)


class AuthPermission(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    content_type_id = models.IntegerField()
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type_id', 'codename'),)


class AuthUser(models.Model):
    id = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user_id = models.IntegerField()
    group_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user_id', 'group_id'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user_id = models.IntegerField()
    permission_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user_id', 'permission_id'),)


class Datosmedicos(models.Model):
    iddatosmedicos = models.AutoField(db_column='idDatosMedicos', primary_key=True)  # Field name made lowercase.
    lugaratencion = models.TextField(db_column='lugarAtencion')  # Field name made lowercase.
    peso = models.TextField()
    estatura = models.TextField()
    idpersona = models.ForeignKey('Personas', models.DO_NOTHING, db_column='idPersona')  # Field name made lowercase.
    ideps = models.ForeignKey('Eps', models.DO_NOTHING, db_column='idEps')  # Field name made lowercase.
    idrh = models.ForeignKey('Rh', models.DO_NOTHING, db_column='idRh')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'datosmedicos'


class DjangoAdminLog(models.Model):
    id = models.IntegerField()
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type_id = models.IntegerField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    id = models.IntegerField()
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'


class DjangoMigrations(models.Model):
    id = models.BigIntegerField()
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


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
    idpersona = models.ForeignKey('Personas', models.DO_NOTHING, db_column='idPersona')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'historiaclinica'


class Informe(models.Model):
    idinforme = models.AutoField(db_column='idInforme', primary_key=True)  # Field name made lowercase.
    nombreinforme = models.TextField(db_column='nombreInforme')  # Field name made lowercase.
    url = models.TextField()
    fecha = models.DateField()
    idpersona = models.ForeignKey('Personas', models.DO_NOTHING, db_column='idPersona')  # Field name made lowercase.

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


class Personas(models.Model):
    idpersona = models.AutoField(db_column='idPersona', primary_key=True)  # Field name made lowercase.
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
    idtipodocumento = models.ForeignKey('Tipodocumento', models.DO_NOTHING, db_column='idTipoDocumento')  # Field name made lowercase.
    idsexo = models.ForeignKey('Sexo', models.DO_NOTHING, db_column='idSexo')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'personas'


class Responsable(models.Model):
    idresponsable = models.AutoField(db_column='idResponsable', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    correo = models.TextField()
    numerodocumento = models.TextField(db_column='numeroDocumento')  # Field name made lowercase.
    telefono = models.TextField()
    profesion = models.TextField()
    ocupacion = models.TextField()
    empresa = models.TextField()
    idpersona = models.ForeignKey(Personas, models.DO_NOTHING, db_column='idPersona')  # Field name made lowercase.
    idparentesco = models.ForeignKey('Tipoparentesco', models.DO_NOTHING, db_column='idParentesco')  # Field name made lowercase.
    idtipodocumento = models.ForeignKey('Tipodocumento', models.DO_NOTHING, db_column='idTipoDocumento')  # Field name made lowercase.

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
    idpersona = models.ForeignKey(Personas, models.DO_NOTHING, db_column='idPersona')  # Field name made lowercase.

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


class Usuario(models.Model):
    idusuario = models.AutoField(db_column='idUsuario', primary_key=True)  # Field name made lowercase.
    contrasena = models.TextField()
    cambiocontrasena = models.TextField(db_column='cambioContrasena')  # Field name made lowercase.
    estado = models.TextField()
    idpersona = models.ForeignKey(Personas, models.DO_NOTHING, db_column='idPersona')  # Field name made lowercase.
    idrol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='idRol')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'usuario'
