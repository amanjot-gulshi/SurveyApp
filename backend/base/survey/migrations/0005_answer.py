# Generated by Django 4.1.2 on 2023-01-19 02:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('survey', '0004_delete_answer'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_text', models.CharField(blank=True, max_length=200)),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='survey.filledsurvey')),
            ],
        ),
    ]
