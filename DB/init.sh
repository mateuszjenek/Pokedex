#!/bin/bash
echo "init.sh starting"
/opt/mssql/bin/sqlservr &

echo "Database going to bed." &&
sleep 15s &&

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 3SQ[4Je]5Gl -d master -i ./init.sql &&

echo "Database initialised!!!" 