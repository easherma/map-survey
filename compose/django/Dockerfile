FROM python:3.5
ENV PYTHONUNBUFFERED 1

# Update and install packages recommended by Django documentation:
# https://docs.djangoproject.com/ja/1.9/ref/contrib/gis/install/geolibs/
# and extra needed packages
RUN apt-get update -y && \
    apt-get install --auto-remove -y \
      binutils \
      libproj-dev \
      gdal-bin \
      postgis \
      curl \
      locales \
      apt-transport-https && \
    rm -rf /var/lib/apt/lists/*


RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && /usr/sbin/locale-gen

# Requirements have to be pulled and installed here, otherwise caching won't work
COPY ./requirements /requirements

RUN pip install -r /requirements/production.txt \
    && groupadd -r django \
    && useradd -r -g django django

COPY ./compose/django/gunicorn.sh /gunicorn.sh
COPY ./compose/django/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh \
    && sed -i 's/\r//' /gunicorn.sh \
    && chmod +x /entrypoint.sh \
    && chown django /entrypoint.sh \
    && chmod +x /gunicorn.sh \
    && chown django /gunicorn.sh

COPY . /app

RUN chown -R django /app
USER django

WORKDIR /app

ENTRYPOINT ["/entrypoint.sh"]
