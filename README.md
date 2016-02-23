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
Se incluyen diversos tests unitarios y de integración, así como análisis de covertura usando las herramientas [mocha](https://mochajs.org/), [chai](http://chaijs.com/) e [istanbul](https://github.com/gotwarlost/istanbul), ejecuta los tests con el comando:    
```
npm test
```

El resultado de los tests unitarios se mostrarán por pantalla como salida de la ejecución, los resultados de los tests de cobertura se mostrarán en `coverage/lcov-report/index.html`.


## Integración continua
Disponemos de un sistema de integración continua con [Travis CI](https://travis-ci.org/), que desplegará el sistema y ejecutará los tests con cada cambio del repositorio, el estado actual del sistema se puede observar a continuación:
* **master:** [![Build Status](https://travis-ci.org/oslugr/ugr-transparente-servidor.svg?branch=master)](https://travis-ci.org/oslugr/ugr-transparente-servidor)
* **dev:** [![Build Status](https://travis-ci.org/oslugr/ugr-transparente-servidor.svg?branch=dev)](https://travis-ci.org/oslugr/ugr-transparente-servidor)

La integración continua, además, ejecutará diversas herramientas con las que obtenemos información sobre cobertura, dependencias y calidad del código:    
[![Coverage Status](https://coveralls.io/repos/github/oslugr/ugr-transparente-servidor/badge.svg?branch=master)](https://coveralls.io/github/oslugr/ugr-transparente-servidor?branch=master)
[![Dependency Status](https://gemnasium.com/oslugr/ugr-transparente-servidor.svg)](https://gemnasium.com/oslugr/ugr-transparente-servidor)
[![Code Climate](https://codeclimate.com/github/oslugr/ugr-transparente-servidor/badges/gpa.svg)](https://codeclimate.com/github/oslugr/ugr-transparente-servidor)

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

# Estructura de la aplicación
## Archivos en raíz
La aplicación se encuentra estructurada de forma similar a cualquier proyecto de node.js:
* `README.md`, `LICENSE`, `.git` y `.gitignore`:  Archivos del repositorio **git**
* `.tavis.yml`: Archivo de configuración de Travis
* `package.json`: Información de la aplicación y dependencias
* `bower.json`, `getRecursos.sh`, `flightplan.js`: Archivos de despliegue
* `app.js`: Archivo principal de la aplicación
* `app/`: Archivos del programa
    * `app/routes/`: Archivos de enrutamiento de las páginas de la aplicación
* `config/`: Archivos de configuración de la aplicación
* `public/`: Archivos públicos del portal
* `views/`: Vistas de las paginas con [Jade](http://jade-lang.com/)
* `test/`: Archivos de tests unitarios y de integración
* `provisioning/`: Archivos de aprovisionamiento

