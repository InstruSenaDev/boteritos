# Generated by Django 5.0.7 on 2024-09-04 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_usuarios_delete_personas_delete_usuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Condicion',
            fields=[
                ('idcondicion', models.AutoField(db_column='idCondicion', primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'condicion',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Diagnostico',
            fields=[
                ('iddiagnostico', models.AutoField(db_column='idDiagnostico', primary_key=True, serialize=False)),
                ('diagnostico', models.TextField()),
            ],
            options={
                'db_table': 'diagnostico',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Direccion',
            fields=[
                ('iddireccion', models.AutoField(db_column='idDireccion', primary_key=True, serialize=False)),
                ('comuna', models.TextField()),
                ('numero', models.TextField()),
                ('barrio', models.TextField()),
            ],
            options={
                'db_table': 'direccion',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Discapacidad',
            fields=[
                ('iddiscapacidad', models.AutoField(db_column='idDiscapacidad', primary_key=True, serialize=False)),
                ('discapacidad', models.TextField()),
            ],
            options={
                'db_table': 'discapacidad',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('idestudiante', models.AutoField(db_column='idEstudiante', primary_key=True, serialize=False)),
                ('tallacamisa', models.TextField(db_column='tallaCamisa')),
            ],
            options={
                'db_table': 'estudiante',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Fechas',
            fields=[
                ('idfecha', models.AutoField(db_column='idFecha', primary_key=True, serialize=False)),
                ('fecharegistro', models.DateField(db_column='fechaRegistro')),
                ('fechaingreso', models.DateField(db_column='fechaIngreso')),
                ('fechanacimiento', models.DateField(db_column='fechaNacimiento')),
            ],
            options={
                'db_table': 'fechas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Matriculas',
            fields=[
                ('idmatricula', models.AutoField(db_column='idMatricula', primary_key=True, serialize=False)),
                ('matricula', models.TextField()),
            ],
            options={
                'db_table': 'matriculas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Profesor',
            fields=[
                ('idprofesor', models.AutoField(db_column='idProfesor', primary_key=True, serialize=False)),
                ('titulo', models.TextField()),
                ('hojavida', models.TextField(db_column='hojaVida')),
            ],
            options={
                'db_table': 'profesor',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Telefonos',
            fields=[
                ('idtelefonos', models.AutoField(db_column='idTelefonos', primary_key=True, serialize=False)),
                ('telefono1', models.TextField()),
                ('telefono2', models.TextField()),
            ],
            options={
                'db_table': 'telefonos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('idusuario', models.AutoField(db_column='idUsuario', primary_key=True, serialize=False)),
                ('nombre', models.TextField()),
                ('apellido', models.TextField()),
                ('correo', models.TextField()),
                ('contrasena', models.TextField()),
                ('cambiocontrasena', models.TextField(db_column='cambioContrasena')),
                ('documento', models.TextField()),
                ('estado', models.TextField()),
                ('edad', models.TextField()),
            ],
            options={
                'db_table': 'usuario',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Areaslogros',
        ),
        migrations.DeleteModel(
            name='Informe',
        ),
        migrations.DeleteModel(
            name='Logros',
        ),
        migrations.DeleteModel(
            name='Telefono',
        ),
        migrations.DeleteModel(
            name='Usuarios',
        ),
    ]
