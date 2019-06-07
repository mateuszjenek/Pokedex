FROM python:3

COPY server.py /


RUN pip3 install flask
RUN pip3 install flask-jsonpify
RUN pip3 install flask-restful
RUN pip3 install pymssql
RUN pip3 install freeze
RUN pip3 install sqlalchemy
RUN pip3 install flask-cors


CMD [ "python", "./server.py" ]

EXPOSE 5002
