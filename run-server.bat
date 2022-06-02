@echo off

echo **********************INSTALL SERVER**************************

call cd ./server

call npm install

echo **********************START SERVER*****************************

call npm run server

pause