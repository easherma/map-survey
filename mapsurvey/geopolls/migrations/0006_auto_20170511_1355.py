# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-05-11 18:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geopolls', '0005_auto_20170511_1351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='description'),
        ),
    ]