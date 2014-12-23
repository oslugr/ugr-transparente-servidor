ugr-transparente
================

Portal de transparencia de la [UGR](http://www.ugr.es/) para publicar los datos y hacerlos accesibles y tratables. La aplicación web está diseñada en [node.js](http://nodejs.org/) junto con [express](http://expressjs.com/) y [jade](http://jade-lang.com/). [Express](http://expressjs.com/) es un framework para desarrollar aplicaciones web mientras que [jade](http://jade-lang.com/) es un módulo para trabajar con plantillas y poder implementar la arquitectura Modelo Vista Controlador.

La web está publicada en [transparente.ugr.es](http://transparente.ugr.es).

## Instalación


1.- Instalar node.js mediante el gestor de paquetes [node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

2.- Instalar base de datos [MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)

3.- Descargar el repositorio `git clone`

    `git clone https://github.com/oslugr/ugr-transparente-servidor`

4.- Entrar al directorio `ugr-transparente-servidor` e instalar las dependencias que se usen en este repositorio.

    `cd ugr-transparente-servidor`
    `npm install`

5.- Modificar el puerto en el que se lanza el servidor en el fichero `app.js` a otro cualquiera, por ejemplo al 3000

    `[línea 25] app.set('port', process.env.PORT || 3000);`

6.- Usar los datos almacenados de la base de datos

    `mongorestore --db transparente dump/transparente`

7.- Lanzar el servidor con el comando `node`

    `node app.js`

Si vas a tu navegador, en la dirección http://localhost:3000 tendrás el servidor disponible
