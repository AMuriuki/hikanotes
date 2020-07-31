FROM python:3.6-alpine

RUN adduser -D Hikanotes

WORKDIR /home/Hikanotes

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn pymysql

COPY app app
COPY migrations migrations
COPY Hikanotes.py config.py boot.sh ./
RUN chmod a+x boot.sh

ENV FLASK_APP Hikanotes.py

RUN chown -R Hikanotes:Hikanotes ./
USER Hikanotes

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
