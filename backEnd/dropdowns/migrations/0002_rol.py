# Generated by Django 5.0.7 on 2024-08-23 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dropdowns', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('idrol', models.AutoField(db_column='idRol', primary_key=True, serialize=False)),
                ('rol', models.TextField()),
            ],
            options={
                'db_table': 'rol',
                'managed': False,
            },
        ),
    ]