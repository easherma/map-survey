import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mapsurvey.settings")
django.setup()

from geopolls.models import Submission
import csv

csv_filepathname="./dataload/bikeways_q.csv"

with open(csv_filepathname) as f:
    dataReader = csv.reader(f, delimiter=',', quotechar='"')


    for row in dataReader:
        print(row)
        if row[0] != 'name': # Ignore the header row, import everything else
            data = Submission()
            data.name = row[0]
            data.org = row[1]
            data.email = row[2]
            data.description = row[3]
            data.geom = row[4]
            data.save()
