FROM public.ecr.aws/docker/library/node:18.19-slim
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm","run","dev"]

FROM public.ecr.aws/docker/library/python:3.8.18-slim
WORKDIR /app
COPY . /app
#RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r ./backend/requirements.txt

CMD ["python","main.py"]
