# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-05-11 19:35
from __future__ import unicode_literals

from django.db import migrations
import djgeojson.fields


class Migration(migrations.Migration):

    dependencies = [
        ('geopolls', '0006_auto_20170511_1355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='geom',
            field=djgeojson.fields.GeometryField(blank=True, null=True),
        ),
    ]
