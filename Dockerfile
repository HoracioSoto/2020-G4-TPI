FROM python:3.8.0-alpine

# directorio de trabajo
WORKDIR /usr/src/app

# variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# instalación de dependencias de psycopg2 (conector Python-Postgres)
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# instalación de dependencias
RUN pip install -U pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copia del archivo entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

# copia del proyecto
COPY . /usr/src/app/

# ejecución entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
