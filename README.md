# UGR Transparente
[![Build Status](https://travis-ci.org/oslugr/ugr-transparente-servidor.svg?branch=master)](https://travis-ci.org/oslugr/ugr-transparente-servidor)
[![Coverage Status](https://coveralls.io/repos/github/oslugr/ugr-transparente-servidor/badge.svg?branch=master)](https://coveralls.io/github/oslugr/ugr-transparente-servidor?branch=master)
[![Dependency Status](https://gemnasium.com/oslugr/ugr-transparente-servidor.svg)](https://gemnasium.com/oslugr/ugr-transparente-servidor)
[![License Status](https://img.shields.io/badge/license-GPL%203.0-blue.svg)](http://www.gnu.org/licenses/gpl-3.0.en.html)
[![Node](https://img.shields.io/badge/node-4.2.6-blue.svg)](https://nodejs.org/en/)
[![Code Climate](https://codeclimate.com/github/oslugr/ugr-transparente-servidor/badges/gpa.svg)](https://codeclimate.com/github/oslugr/ugr-transparente-servidor)

-------------------


Portal de transparencia de la [UGR](http://www.ugr.es/) para publicar los datos y hacerlos accesibles y tratables. Desarrollado con [Node.js](http://nodejs.org/) y [Express](http://expressjs.com/).

La aplicación es accesible desde <http://transparente.ugr.es>.

## Instalación
1. En caso de no tener instalado `git`:
```
sudo apt-get install git
```

2. Instalamos **Node.js**:
```
wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -
sudo apt-get install -y nodejs
```
Comprobamos que **Node.js** y **NPM** (su gestor de paquetes) se han instalado correctamente.
```
node -v
npm -v
```

3. Descargamos todo el contenido del repositorio para poder ejecutar la aplicación.
```
git clone https://github.com/oslugr/ugr-transparente-servidor.git
```

4. Instalamos todas las dependencias de la aplicación:
```
cd ugr-transparente-servidor
sudo npm install
```

5. Finalmente iniciamos la aplicación:
```
npm start
```

6. Igualmente podemos reiniciar o detener la aplicación de una forma similar:
```
npm restart|stop
```

## Provisionamiento
También podemos instalar la aplicación automáticamente aprovisionando el servidor con todo lo necesario mediante [Ansible](http://www.ansible.com/home).

```
sudo apt-get install ansible
```

1. El archivo `ansible_hosts` dentro de la carpeta `provisioning` contiene la dirección del servidor; esta dirección puede ser una dirección IP o una dirección URL.
```
[transparente]
transparente.ugr.es
```

2. Comprobamos que tenemos conexión SSH con el servidor.
```
ANSIBLE_HOSTS=provisioning/ansible_hosts ansible transparente -u USUARIO -m ping
```
Si el acceso es correcto la respuesta del servidor será la siguiente:
```
transparente.ugr.es | success >> {
    "changed": false,
    "ping": "pong"
}
```

3. Para ejecutar el provisionamiento Ansible recibirá como variable de entorno la ruta del `ansible_hosts` (`ANSIBLE_HOSTS=provisioning/ansible_hosts`) y como parámetro el usuario con el que accederemos al servidor (`--extra-vars "user=USUARIO"`). El archivo `provisioning/transparente.yml` es el **playbook**, el archivo de instrucciones que **Ansible** seguirá para saber que tareas tiene que llevar a cabo durante el provisionamiento.

```
ANSIBLE_HOSTS=provisioning/ansible_hosts ansible-playbook provisioning/transparente.yml --extra-vars "user=USUARIO"
```

## Testing
Se han incluido tests unitarios para comprobar que las diferentes funcionalidades de la aplicación funcionan correctamente, de dichas funcionalidades hay que destacar el acceso a los archivos JSON con los datos del portal (para comprobar que existen y que los datos que contienen están en un formato válido) y que las diferentes páginas del portal son accesibles. También se ha creado un test de cobertura para comprobar que toda funcionalidad del portal está cubierta y asegurada por sus correspondientes test unitarios. Los test unitarios son realizados con [Mocha](https://github.com/mochajs/mocha) y el test de cobertura es realizado con [Istanbul](https://github.com/gotwarlost/istanbul). Se ejecutan con:

```
npm test
```

El resultado de los tests unitarios se mostrarán por pantalla como salida de la ejecución del script; a su vez, el resultado de los tests de cobertura se almacenarán en el archivo `coverage/lcov-report/index.html`, mostrando el porcentaje del código que está cubierto por los test unitarios.

## Integración continua
Disponemos de una integración continua que nos permite detectar automáticamente mediante la ejecución de pruebas los fallos que se produzcan cuando se actualiza el código, evitando así encontrarnos problemas inesperados durante el despliegue de la aplicación.

Para introducir la integración continua vamos a usar [Travis CI](https://travis-ci.org/). Para poder usarlo, activamos continua como explican en la propia [página](http://docs.travis-ci.com/user/getting-started/) de **Travis CI**, lo más importante es activar el uso de Travis para nuestro repositorio y crear el archivo de configuración `.travis.yml`.

A partir de ahora, con cada nuevo cambio que publiquemos en el repositorio del proyecto se generará una build del programa en Travis que ejecutará los _scripts_ básicos de **NPM**: `npm install` y `npm test`. Ya solo nos queda comprobar el resultado de estas [builds](https://travis-ci.org/oslugr/ugr-transparente-servidor/builds).

## Despliegue automático
Cuando hagamos cambios en nuestra aplicación y queramos aplicarlos en el servidor, no es necesario que accedamos a él manualmente y apliquemos dichos cambios, podemos usar [Flightplan](https://github.com/pstadler/flightplan) para hacer esto automáticamente.

Si queremos utilizar **Flightplan** para el despliegue automático es necesario que tengamos nuestra clave SSH copiada en el servidor como hicimos para el provisionamiento.

```
ssh-copy-id USUARIO@transparente.ugr.es
```

El archivo en el que hemos definido la configuración para el despliegue automático es `flightplan.js`. Podemos diferenciar dos partes esenciales: `plan.target` y `plan.remote`; el primero indica los parámetros para acceder al servidor, el segundo indica las tareas a realizar durante el despliegue. Solo falta dar a **Flightplan** la orden de despliegue automático, donde `USUARIO` es el usuario con permisos de superusuario con el que accederemos al servidor:

```
USER=USUARIO npm run-script deploy
```

## Estructura de la aplicación
# Archivos en raíz
De los archivos que nos encontramos en la carpeta raíz, tenemos por un lado los archivos de carácter informativo como son este mismo archivo (`README.md`) y el archivo con la licencia de la aplicación (`LICENSE`); los archivos de configuración de diversas utilidades (`.gitignore` de **Git**, `.travis.yml` de **Travis CI** y `flightplan.js` de **Flightplan**); y finalmente los archivos más importantes de la aplicación: `app.js` y `package.json`.
- `app.js` es la aplicación en si misma, es donde se crea el servidor mediante **Express** y se configuran tanto las rutas de acceso a las diferentes páginas como el resto de aspectos de acceso al servidor.
- `package.json` es esencialmente el archivo que documenta una aplicación hecha en **Node.js**. Es imprescindible que contenga el nombre y la versión de la aplicación, pero además puede contener mucha más información como quienes son los desarrolladores/colaboradores, descripción, licencia, repositorio o página web. Además también tiene otra parte que además de descriptiva es más bien funcional: **dependencias** y **scripts**
  - De entre las dependencias podemos diferenciar dos tipos: dependencias (`dependencies`) y dependencias de desarrollo (`devDependencies`). Las primeras se refieren a los módulos que la aplicación necesita para funcionar, por ejemplo, `express` para crear el servidor de la aplicación y `jade` para generar los archivos _HTML_ de las distintas páginas basándose en los archivos de plantilla. Las segundas se refieren a los módulos necesarios para realizar todas las tareas habituales durante el desarrollo de la aplicación, por ejemplo, `istanbul` y `mocha` para el testeo y `flightplan` para el despliegue automático.
  - Los _scripts_ son comandos que nos van a permitir crear una capa de abstracción sobre acciones comunes para ejecutarlas con mayor comodidad, por ejemplo, para iniciar la aplicación en vez de tener que introducir `PORT=3000 IP=127.0.0.1 forever start -l /var/log/forever.log -a -o /var/log/out.log -e /var/log/err.log ./app.js`, solo tenemos que introducir `sudo npm start`. Podemos crear tantos _scripts_ como queramos, pero solo los _scripts_ `start` y `test` se pueden ejecutar directamente con `npm`, el resto tienen que ejecutarse mediante `npm run-script` (ej: `npm run-script kill`).
  - Es muy importante que el archivo `package.json` sea un archivo válido, en caso contrario la aplicación no funcionara correctamente. Podemos comprobar la validez de nuestro archivo en diferentes páginas web como [esta](http://package-json-validator.com/).

## Carpeta `config`
Toda la información presente en el portal está almacena en archivos JSON que funcionan como índices de los elementos que están almacenados en [OpenData UGR](http://opendata.ugr.es/). Por ejemplo, en [esta sección](http://transparente.ugr.es/infoEconomica.html#presupuesto-2015) de una página del portal tenemos una tabla con diferentes elementos que son nuestros datos abiertos, estos datos abiertos no están almacenados en el propio servidor de **UGR Transparente**, están almacenados en el servidor de **OpenData UGR**, como podremos ver si accedemos al enlace que acompaña a la descripción de alguno de los datos (ej: [Créditos matriculados](http://opendata.ugr.es/dataset/presupuesto-2015/resource/a5855f02-d82c-45a2-b1ab-d9e465e1a0e2); lo que sí está almacenado en el servidor de **UGR Transparente** son los índices que con los se generan esas tablas, que están en los archivos JSON que se encuentran en esta carpeta.

## Carpeta `public`
Los elementos visuales, hojas de estilos _CSS_ y _scripts/librerías_ que se ejecutarán el navegador (importante diferenciar ejecuciones en el lado del cliente y en el lado del servidor) se almacenan en esta carpeta para ser usados por cualquiera de las páginas del portal.

## Carpeta `views`
Para que las páginas del portal se generen fácilmente siguiendo una estética y organización similares (además cumpliendo con el objetivo de que los datos estén separados de la interfaz de usuario) usaremos plantillas, que en nuestro caso son plantillas **Jade**. Estás plantillas usarán los elementos descritos de la carpeta **public** y una vez procesadas producirán los archivos _HTML_ que serán visualizaremos cuando accedamos al portal.

## Carpeta `routes`
Esta carpeta es la que contiene todos los _scripts_ escritos en **Node.js** que representan la lógica de la aplicación. Cada uno de ellos recupera los datos correspondientes de los archivos _JSON_ de índices y genera la página correspondiente procesando la plantilla **Jade** indicada.

## Carpeta `node_modules`
Los módulos que usa la aplicación no se distribuyen con la misma, si no que se instalan cuando se descarga la aplicación. En esta carpeta es donde se almacenan los archivos de todos los módulos instalados.

## Carpetas `test`, `coverage` y `provisioning`
Al igual que diferenciábamos entre módulos para la aplicación y módulos para el desarrollo, las carpetas anteriores serian las carpetas de la aplicación, mientras que estas serian las carpetas de los módulos para el desarrollo.

La carpeta **test** correspondería al _script_ que pasa los test unitarios con **Mocha** (`test.js`) y el archivo _JSON_ que sirve de índice para los elementos del portal que se testean (`acceso.json`).

La carpeta **coverage** correspondería a los archivos de resultados generados una vez que los test unitarios han sido comprobados con **Istanbul** para conocer la cobertura que proporcionan los test unitarios a nuestro código.

La carpeta **provisioning** correspondería al archivo de configuración que nos permite realizar el provisionamiento del servidor con **Ansible** (`transparente.yml`) y el archivo que con la dirección del servidor a provisionar (`ansible_host`).
