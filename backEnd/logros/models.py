from django.db import models

# Create your models here.
class Areas(models.Model):
    idareas = models.AutoField(db_column='idAreas', primary_key=True)   
    nombre = models.TextField()
    descripcion = models.TextField()

    class Meta:
        managed = False
        db_table = 'areas'


class Areaslogros(models.Model):
    idareaslogros = models.AutoField(db_column='idAreasLogros', primary_key=True)   
    resultado = models.TextField()
    idareas = models.IntegerField(db_column='idAreas')   
    idlogros = models.IntegerField(db_column='idLogros')   
    idusuario = models.IntegerField(db_column='idUsuario')   

    class Meta:
        managed = False
        db_table = 'areaslogros'

class Informe(models.Model):
    idinforme = models.AutoField(db_column='idInforme', primary_key=True)   
    nombreinforme = models.TextField(db_column='nombreInforme')   
    url = models.TextField()
    fecha = models.DateField()
    idusuario = models.IntegerField(db_column='idUsuario')   

    class Meta:
        managed = False
        db_table = 'informe'

class Logros(models.Model):
    idlogros = models.AutoField(db_column='idLogros', primary_key=True)   
    nombre = models.TextField()
    tipo = models.TextField()
    estado = models.TextField()
    comentario = models.TextField()
    idtrimestre = models.ForeignKey('Trimestre', models.DO_NOTHING, db_column='idTrimestre')   

    class Meta:
        managed = False
        db_table = 'logros'

class Trimestre(models.Model):
    idtrimestre = models.AutoField(db_column='idTrimestre', primary_key=True)   
    fechainicio = models.DateField(db_column='fechaInicio')   
    fechafin = models.DateField(db_column='fechaFin')   
    numero = models.TextField()

    class Meta:
        managed = False
        db_table = 'trimestre'

