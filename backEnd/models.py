# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Admin(models.Model):
    idadmin = models.AutoField(db_column='idAdmin', primary_key=True)  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'admin'


class Areas(models.Model):
    idarea = models.AutoField(db_column='idArea', primary_key=True)  # Field name made lowercase.
    area = models.TextField()

    class Meta:
        managed = False
        db_table = 'areas'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
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
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class Condicion(models.Model):
    idcondicion = models.AutoField(db_column='idCondicion', primary_key=True)  # Field name made lowercase.
    idhistoriaclinica = models.ForeignKey('Historiaclinica', models.DO_NOTHING, db_column='idHistoriaClinica')  # Field name made lowercase.
    iddiagnostico = models.ForeignKey('Diagnostico', models.DO_NOTHING, db_column='idDiagnostico')  # Field name made lowercase.
    iddiscapacidad = models.ForeignKey('Discapacidad', models.DO_NOTHING, db_column='idDiscapacidad')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'condicion'


class Datosmedicos(models.Model):
    iddatosmedicos = models.AutoField(db_column='idDatosMedicos', primary_key=True)  # Field name made lowercase.
    lugaratencion = models.TextField(db_column='lugarAtencion')  # Field name made lowercase.
    peso = models.TextField()
    altura = models.TextField()
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.
    ideps = models.ForeignKey('Eps', models.DO_NOTHING, db_column='idEps')  # Field name made lowercase.
    idrh = models.ForeignKey('Rh', models.DO_NOTHING, db_column='idRh')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'datosmedicos'


class Diagnostico(models.Model):
    iddiagnostico = models.AutoField(db_column='idDiagnostico', primary_key=True)  # Field name made lowercase.
    diagnostico = models.TextField()

    class Meta:
        managed = False
        db_table = 'diagnostico'


class Direccion(models.Model):
    iddireccion = models.AutoField(db_column='idDireccion', primary_key=True)  # Field name made lowercase.
    comuna = models.TextField()
    numero = models.TextField()
    barrio = models.TextField()
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'direccion'


class Discapacidad(models.Model):
    iddiscapacidad = models.AutoField(db_column='idDiscapacidad', primary_key=True)  # Field name made lowercase.
    discapacidad = models.TextField()

    class Meta:
        managed = False
        db_table = 'discapacidad'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Eps(models.Model):
    ideps = models.AutoField(db_column='idEps', primary_key=True)  # Field name made lowercase.
    eps = models.TextField()

    class Meta:
        managed = False
        db_table = 'eps'


class Estudiante(models.Model):
    idestudiante = models.AutoField(db_column='idEstudiante', primary_key=True)  # Field name made lowercase.
    tallacamisa = models.TextField(db_column='tallaCamisa')  # Field name made lowercase.
    institutoprocedencia = models.TextField(db_column='institutoProcedencia')  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.
    idmatricula = models.ForeignKey('Matriculas', models.DO_NOTHING, db_column='idMatricula')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'estudiante'


class Fechas(models.Model):
    idfecha = models.AutoField(db_column='idFecha', primary_key=True)  # Field name made lowercase.
    fecharegistro = models.DateField(db_column='fechaRegistro')  # Field name made lowercase.
    fechaingreso = models.DateField(db_column='fechaIngreso')  # Field name made lowercase.
    fechanacimiento = models.DateField(db_column='fechaNacimiento')  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'fechas'


class Historiaclinica(models.Model):
    idhistoriaclinica = models.AutoField(db_column='idHistoriaClinica', primary_key=True)  # Field name made lowercase.
    medicamentos = models.TextField()
    restriccionesalimenticias = models.TextField(db_column='restriccionesAlimenticias')  # Field name made lowercase.
    archivo = models.TextField()
    observacion = models.TextField()
    idestudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='idEstudiante')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'historiaclinica'


class Informes(models.Model):
    idinforme = models.AutoField(db_column='idInforme', primary_key=True)  # Field name made lowercase.
    informe = models.TextField()
    fecha = models.DateField()
    observacion = models.TextField()
    idestudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='idEstudiante')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'informes'


class Logroestudiante(models.Model):
    idlogroestudiante = models.AutoField(db_column='idLogroEstudiante', primary_key=True)  # Field name made lowercase.
    resultado = models.TextField()
    fecha = models.DateField()
    estado = models.TextField()
    idlogro = models.ForeignKey('Logros', models.DO_NOTHING, db_column='idLogro')  # Field name made lowercase.
    idestudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='idEstudiante')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'logroestudiante'


class Logros(models.Model):
    idlogro = models.AutoField(db_column='idLogro', primary_key=True)  # Field name made lowercase.
    logro = models.TextField()
    estado = models.TextField()
    observacion = models.TextField()
    idtrimestre = models.ForeignKey('Trimestres', models.DO_NOTHING, db_column='idTrimestre')  # Field name made lowercase.
    idtipologro = models.ForeignKey('Tipologro', models.DO_NOTHING, db_column='idTipoLogro')  # Field name made lowercase.
    idprofesor = models.ForeignKey('Profesor', models.DO_NOTHING, db_column='idProfesor')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'logros'


class Matriculas(models.Model):
    idmatricula = models.AutoField(db_column='idMatricula', primary_key=True)  # Field name made lowercase.
    matricula = models.TextField()

    class Meta:
        managed = False
        db_table = 'matriculas'


class Profesor(models.Model):
    idprofesor = models.AutoField(db_column='idProfesor', primary_key=True)  # Field name made lowercase.
    titulo = models.TextField()
    hojavida = models.TextField(db_column='hojaVida')  # Field name made lowercase.
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.
    idarea = models.ForeignKey(Areas, models.DO_NOTHING, db_column='idArea')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'profesor'


class Responsable(models.Model):
    idresponsable = models.AutoField(db_column='idResponsable', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    apellido = models.TextField()
    correo = models.TextField()
    numerodocumento = models.TextField(db_column='numeroDocumento')  # Field name made lowercase.
    telefono = models.TextField()
    profesion = models.TextField()
    ocupacion = models.TextField()
    empresa = models.TextField()
    idestudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='idEstudiante')  # Field name made lowercase.
    idtipodocumento = models.ForeignKey('Tipodocumento', models.DO_NOTHING, db_column='idTipoDocumento')  # Field name made lowercase.
    idsexo = models.ForeignKey('Sexo', models.DO_NOTHING, db_column='idSexo')  # Field name made lowercase.
    idtipoparentesco = models.ForeignKey('Tipoparentesco', models.DO_NOTHING, db_column='idTipoParentesco')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'responsable'


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


class Sexo(models.Model):
    idsexo = models.AutoField(db_column='idSexo', primary_key=True)  # Field name made lowercase.
    sexo = models.TextField()

    class Meta:
        managed = False
        db_table = 'sexo'


class Telefonos(models.Model):
    idtelefonos = models.AutoField(db_column='idTelefonos', primary_key=True)  # Field name made lowercase.
    telefono1 = models.TextField()
    telefono2 = models.TextField()
    idusuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='idUsuario')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'telefonos'


class Tipodocumento(models.Model):
    idtipodocumento = models.AutoField(db_column='idTipoDocumento', primary_key=True)  # Field name made lowercase.
    tipodocumento = models.TextField(db_column='tipoDocumento')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipodocumento'


class Tipologro(models.Model):
    idtipologro = models.AutoField(db_column='idTipoLogro', primary_key=True)  # Field name made lowercase.
    tipologro = models.TextField(db_column='tipoLogro')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipologro'


class Tipoparentesco(models.Model):
    idtipoparentesco = models.AutoField(db_column='idTipoParentesco', primary_key=True)  # Field name made lowercase.
    tipoparentesco = models.TextField(db_column='tipoParentesco')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'tipoparentesco'


class Trimestres(models.Model):
    idtrimestre = models.AutoField(db_column='idTrimestre', primary_key=True)  # Field name made lowercase.
    trimestre = models.TextField()
    descripcion = models.TextField()
    fechainicio = models.DateField(db_column='fechaInicio')  # Field name made lowercase.
    fechafin = models.DateField(db_column='fechaFin')  # Field name made lowercase.
    estado = models.TextField()

    class Meta:
        managed = False
        db_table = 'trimestres'


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
    imagen = models.TextField()
    idrol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='idRol')  # Field name made lowercase.
    idsexo = models.ForeignKey(Sexo, models.DO_NOTHING, db_column='idSexo')  # Field name made lowercase.
    idtipodocumento = models.ForeignKey(Tipodocumento, models.DO_NOTHING, db_column='idTipoDocumento')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'usuario'
