@ECHO OFF
TITLE LocalStreaming Server
ECHO ==================================================
ECHO INICIANDO SERVIDOR.....
ECHO ==================================================
@ECHO
ECHO Verificando todas as dependencias.....

npx nodemon app.js

PAUSE