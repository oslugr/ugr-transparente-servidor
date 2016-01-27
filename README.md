# UGR Transparente
[![Coverage Status](https://coveralls.io/repos/github/oslugr/ugr-transparente-servidor/badge.svg?branch=master)](https://coveralls.io/github/oslugr/ugr-transparente-servidor?branch=master)

[![Build Status](https://travis-ci.org/oslugr/ugr-transparente-servidor.svg?branch=master)](https://travis-ci.org/oslugr/ugr-transparente-servidor)




Portal de transparencia de la [UGR](http://www.ugr.es/) para publicar los datos y hacerlos accesibles y tratables. La aplicación web está diseñada en [Node.js](http://nodejs.org/) junto con [Express](http://expressjs.com/) y [Jade](http://jade-lang.com/). [Express](http://expressjs.com/) es un framework para desarrollar aplicaciones web mientras que [Jade](http://jade-lang.com/) es un módulo para trabajar con plantillas y poder implementar la arquitectura Modelo Vista Controlador.

La aplicación es accesible desde [http://transparente.ugr.es/](http://transparente.ugr.es).

## Instalación manual
0.- Se asume que `git` se encuentra instalado en el sistema, en caso contrario:

```
sudo apt-get install git
```

1.- Lo primero es instalar **Node.js**. Para ello primero instalamos el paquete `python-software-properties` que nos permite añadir repositorios mediante el comando `add-apt-repository`. Seguidamente añadimos el repositorio para instalar **Node.js**, actualizamos la lista de paquetes e instalamos `nodejs`.

```
sudo apt-get install python-software-properties
sudo apt-add-repository ppa:chris-lea/node.js
sudo apt-get update && sudo apt-get install nodejs
```

Comprobamos que **Node.js** y **NPM** (su gestor de paquetes) se han instalado correctamente.

```
node -v
npm -v
```

2.- Descargamos todo el contenido del repositorio para poder ejecutar la aplicación. Es preferible que siempre hagamos el clonado de un repositorio mediante SSH para lo que es necesario que primero hayamos subido nuestra clave SSH a GitHub. En la propia página de GitHub explican como hacerlo desde [aquí](https://help.github.com/articles/generating-ssh-keys/).

```
git clone git@github.com:oslugr/ugr-transparente-servidor.git
```

Si tuviéramos problemas con la conexión SSH, siempre podremos seguir haciéndolo mediante HTTPS:

```
git clone https://github.com/oslugr/ugr-transparente-servidor.git
```

3.- Nos situamos en el directorio de la aplicación (`ugr-transparente-servidor`) y procedemos a instalar todas las dependencias necesarias para la aplicación.

```
cd ugr-transparente-servidor
sudo npm install
```

Comprobamos también que las dependencias de todos los módulos se cumplen:

```
npm list --depth=0
```

4.- El puerto que el servidor va a estar escuchando para resolver peticiones deberemos indicarlo en el archivo `package.json`. Para que la aplicación sea accesible de forma pública, tendremos que poner como puerto de escucha obligatoriamente el puerto 80, ya que este es el puerto por defecto al que los navegadores harán las peticiones por defecto.

Si estamos probando la aplicación de forma local, podemos usar cualquier puerto, pero siempre con un número superior a 1024, ya que los inferiores a este son puertos reservados por el sistema; por ejemplo, vamos a usar el 3000.

También tenemos que indicar la IP o el URL del servidor en el que estará la aplicación ejecutándose; por ejemplo, para la ejecución de prueba ejecutamos la aplicación localmente en la dirección IP `127.0.0.1`, para la ejecución de acceso público ejecutamos la aplicación en el servidor `transparente.ugr.es`.

Indicaremos el puerto con la variable `PORT` y la IP o URL con la variable `IP`. Ambas variables se las pasamos a la aplicación en el script de inicio `npm start`.
- Configuración local:

  ```
  {
  ...
  "scripts": {
  "start": "PORT=3000 IP=127.0.0.1 forever start -l /var/log/forever.log -a -o /var/log/out.log -e /var/log/err.log ./app.js",
  ...
  }
  ```

- Configuración pública:

  ```
  {
  ...
  "scripts": {
  "start": "PORT=80 IP=transparente.ugr.es forever start -l /var/log/forever.log -a -o /var/log/out.log -e /var/log/err.log ./app.js",
  ...
  }
  ```

6.- Por último solo nos queda, arrancar la aplicación mediante un script de inicio del archivo `package.json`. Es imprescindible que ejecutemos este script con permisos de superusuario debido a que los archivos de registro se almacenarán en directorios que requieren dichos permisos.

```
sudo npm start
```

- Si se ha realizado la configuración para una instalación pública, al abrir el navegador y acceder a la dirección correspondiente (como es [http://transparente.ugr.es](http://transparente.ugr.es)), la aplicación debería estar funcionando para ser accesible desde cualquier lugar con acceso a internet.
- Si se ha realizado la configuración para una instalación local, al abrir un navegador y acceder a la dirección [http://localhost:3000](http://localhost:3000), la aplicación debería estar funcionando para ser accesible solo desde el entorno local.

7.- Cuando queramos detener el proceso tendremos que usar el script `kill` que hay en el archivo `package.json`.

```
npm run-script kill
```

# Instalación automática (aprovisionamiento)
También podemos instalar la aplicación automáticamente aprovisionando el servidor con todo lo necesario mediante [Ansible](http://www.ansible.com/home).

1.- En este caso lo primero que tenemos que hacer asegurarnos que tenemos conexión mediante SSH al servidor, para simplificar la conexión copiaremos nuestro archivo de claves al servidor; a considerar que `USUARIO` es el usuario con el que accedemos al servidor y que `transparente.ugr.es` es la dirección de nuestro servidor en este caso.

```
ssh-copy-id USUARIO@transparente.ugr.es
```

Ahora comprobamos que podemos acceder directamente al servidor sin tener que introducir contraseña.

```
ssh USUARIO@transparente.ugr.es
```

2.- Instalamos **Ansible** como cualquier otro paquete:

```
sudo apt-get install ansible
```

3.- El archivo `ansible_hosts` dentro de la carpeta `provisioning` contiene la dirección del servidor que vamos a aprovisionar con ansible_hosts. Esta dirección puede ser una dirección IP o una dirección URL.

```
[transparente]
transparente.ugr.es
```

4.- Vamos a comprobar que tenemos conexión SSH con el servidor mediante **Ansible** usando el comando `ping`.

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

5.- Por último solo nos queda ejecutar el aprovisionamiento. Ansible recibirá como variable de entorno la ruta del `ansible_hosts` (`ANSIBLE_HOSTS=provisioning/ansible_hosts`) y como parámetro el usuario con el que accederemos al servidor (`--extra-vars "user=USUARIO"`). El archivo `provisioning/transparente.yml` es el **playbook**, el archivo de instrucciones que **Ansible** seguirá para saber que tareas tiene que llevar a cabo durante el aprovisionamiento.

```
ANSIBLE_HOSTS=provisioning/ansible_hosts ansible-playbook provisioning/transparente.yml --extra-vars "user=USUARIO"
```

6.- De igual forma que cuando hicimos la instalación manual, podremos comprobar desde un navegador que accediendo a la dirección de nuestro servidor este debe estar operativo.

# Tests unitarios y de cobertura
Se han incluido tests unitarios para comprobar que las diferentes funcionalidades de la aplicación funcionan correctamente, de dichas funcionalidades hay que destacar el acceso a los archivos JSON con los datos del portal (para comprobar que existen y que los datos que contienen están en un formato válido) y que las diferentes páginas del portal son accesibles. También se ha creado un test de cobertura para comprobar que toda funcionalidad del portal está cubierta y asegurada por sus correspondientes test unitarios. Los test unitarios son realizados con [Mocha](https://github.com/mochajs/mocha) y el test de cobertura es realizado con [Istanbul](https://github.com/gotwarlost/istanbul). Se ejecutan con:

```
npm test
```

El resultado de los tests unitarios se mostrarán por pantalla como salida de la ejecución del script; a su vez, el resultado de los tests de cobertura se almacenarán en el archivo `coverage/lcov-report/index.html`, mostrando el porcentaje del código que está cubierto por los test unitarios.

# Integración continua
Disponemos de una integración continua que nos permite detectar automáticamente mediante la ejecución de pruebas los fallos que se produzcan cuando se actualiza el código, evitando así encontrarnos problemas inesperados durante el despliegue de la aplicación.

Para introducir la integración continua vamos a usar [Travis CI](https://travis-ci.org/). Para poder usarlo, activamos continua como explican en la propia [página](http://docs.travis-ci.com/user/getting-started/) de **Travis CI**, lo más importante es activar el uso de Travis para nuestro repositorio y crear el archivo de configuración `.travis.yml`.

A partir de ahora, con cada nuevo cambio que publiquemos en el repositorio del proyecto se generará una build del programa en Travis que ejecutará los _scripts_ básicos de **NPM**: `npm install` y `npm test`. Ya solo nos queda comprobar el resultado de estas [builds](https://travis-ci.org/oslugr/ugr-transparente-servidor/builds).

# Despliegue automático
Cuando hagamos cambios en nuestra aplicación y queramos aplicarlos en el servidor, no es necesario que accedamos a él manualmente y apliquemos dichos cambios, podemos usar [Flightplan](https://github.com/pstadler/flightplan) para hacer esto automáticamente.

Si queremos utilizar **Flightplan** para el despliegue automático es necesario que tengamos nuestra clave SSH copiada en el servidor como hicimos para el aprovisionamiento.

```
ssh-copy-id USUARIO@transparente.ugr.es
```

El archivo en el que hemos definido la configuración para el despliegue automático es `flightplan.js`. Podemos diferenciar dos partes esenciales: `plan.target` y `plan.remote`; el primero indica los parámetros para acceder al servidor, el segundo indica las tareas a realizar durante el despliegue.

Además, si algún comando tiene que ser ejecutado con permisos de superusuario (como en este caso algunos de los _scripts_ de **NPM**), es necesario que se añadan al archivo `/etc/sudoers` para que no se solicite la contraseña del usuario cuando se vayan a ejecutar; si no hacemos esto, la ejecución de **Flightplan** dará un error y no finalizará correctamente.

```
...
ALL ALL=NOPASSWD: /usr/bin/npm
...
```

Solo falta dar a **Flightplan** la orden de despliegue automático, donde `USUARIO` es el usuario con permisos de superusuario con el que accederemos al servidor:

```
USER=USUARIO npm run-script deploy
```

# Estructura de la aplicación
## Archivos en raíz
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

La carpeta **provisioning** correspondería al archivo de configuración que nos permite realizar el aprovisionamiento del servidor con **Ansible** (`transparente.yml`) y el archivo que con la dirección del servidor a aprovisionar (`ansible_host`).
