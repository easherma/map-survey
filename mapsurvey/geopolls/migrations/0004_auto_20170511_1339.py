# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-05-11 18:39
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import djgeojson.fields


class Migration(migrations.Migration):

    dependencies = [
        ('geopolls', '0003_auto_20170510_1511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='geom',
            field=djgeojson.fields.GeometryField(blank=True),
        ),
        migrations.AlterField(
            model_name='submission',
            name='user_id',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
