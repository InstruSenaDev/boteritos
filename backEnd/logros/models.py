from django.db import models

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
    estado = models.TextField()
    comentario = models.TextField()
    idtrimestre = models.ForeignKey('Trimestre', models.DO_NOTHING, db_column='idTrimestre')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'logros'

class Trimestre(models.Model):
    idtrimestre = models.AutoField(db_column='idTrimestre', primary_key=True)  # Field name made lowercase.
    fechainicio = models.DateField(db_column='fechaInicio')  # Field name made lowercase.
    fechafin = models.DateField(db_column='fechaFin')  # Field name made lowercase.
    numero = models.TextField()

    class Meta:
        managed = False
        db_table = 'trimestre'

