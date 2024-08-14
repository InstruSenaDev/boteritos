from django.db import models

# Create your models here.
class Areas(models.Model):
    idareas = models.AutoField(db_column='idAreas', primary_key=True)  # Field name made lowercase.
    nombre = models.TextField()
    descripcion = models.TextField()

    class Meta:
        managed = False
        db_table = 'areas'

class Eps(models.Model):
    ideps = models.AutoField(db_column='idEps', primary_key=True)  # Field name made lowercase.
    nombreeps = models.TextField(db_column='nombreEps')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'eps'

class Rh(models.Model):
    idrh = models.AutoField(db_column='idRh', primary_key=True)  # Field name made lowercase.
    tiporh = models.TextField(db_column='tipoRh')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'rh'

class Sexo(models.Model):
    idsexo = models.AutoField(db_column='idSexo', primary_key=True)  # Field name made lowercase.
    sexo = models.TextField()

    class Meta:
        managed = False
        db_table = 'sexo'

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