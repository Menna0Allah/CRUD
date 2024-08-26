# Generated by Django 5.1 on 2024-08-16 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='emp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('job', models.CharField(max_length=10)),
                ('years', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
