# Generated by Django 4.1.2 on 2022-11-13 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
