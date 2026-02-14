FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt -i https://mirror-pypi.runflare.com/simple

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myproject.wsgi:application"]