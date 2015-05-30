// flightplan.js
var plan = require('flightplan');

// Configuración
plan.target('azure', {
  host: 'testugrts.cloudapp.net',
  username: process.env.USER,
  agent: process.env.SSH_AUTH_SOCK
});

// Acciones a ejecutar remotamente
plan.remote(function(remote) {
  remote.log('Creando copia de seguridad...');
  remote.exec('sudo cp -Rf ugr-transparente-servidor ugr-transparente-servidor.bak');

  remote.with('cd ugr-transparente-servidor',function() {
    remote.log('Deteniendo el servidor...');
    remote.exec('npm run-script kill');
    remote.log('Restableciendo parámetros de acceso...');
    remote.exec('sed "s/IP=testugrts.cloudapp.net/IP=127.0.0.1/" -i package.json');
    remote.exec('sed "s/PORT=80/PORT=3000/" -i package.json');
    remote.log('Obteniendo cambios...');
    remote.exec('git pull origin dev');
    remote.log('Instalando dependencias...');
    remote.exec('sudo npm install');
    remote.log('Cambiando parámetros de acceso...');
    //remote.exec('sed "s/IP=127.0.0.1/IP=testugrts.cloudapp.net/" -i package.json');
    //remote.exec('sed "s/PORT=3000/PORT=80/" -i package.json');
    remote.log('Arrancando el servidor...');
    remote.exec('sudo npm start');
  });
});
