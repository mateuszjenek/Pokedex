FROM microsoft/mssql-server-linux

ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=3SQ[4Je]5Gl

ADD init.sql ./init.sql
ADD init.sh ./init.sh

RUN chmod a+x ./init.sh
RUN ./init.sh 