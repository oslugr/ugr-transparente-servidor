UGR Transparente
================

Portal de transparencia de la [UGR](http://www.ugr.es/) para publicar los datos y hacerlos accesibles y tratables. La aplicación web está diseñada en [Node.js](http://nodejs.org/) junto con [Express](http://expressjs.com/) y [Jade](http://jade-lang.com/). [Express](http://expressjs.com/) es un framework para desarrollar aplicaciones web mientras que [Jade](http://jade-lang.com/) es un módulo para trabajar con plantillas y poder implementar la arquitectura Modelo Vista Controlador.

La aplicación es accesible desde [http://transparente.ugr.es/](http://transparente.ugr.es).


## Instalación

1.- Instalar Node.js como indican en su [repositorio](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

(Nota: en la versión 14.10 de Ubuntu (Utopic Unicorn), se han detectado problemas para instalar Node.js desde los repositorios oficiales de la aplicación. Para solucionar esto podemos seguir las instrucciones de [este enlace](http://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/).)

2.- Descargar el repositorio `git clone`

```
git clone https://github.com/oslugr/ugr-transparente-servidor
```

3.- Entrar al directorio `ugr-transparente-servidor` e instalar las dependencias que se usen en este repositorio.

```
cd ugr-transparente-servidor
npm install
```

4.- La siguiente línea se encuentra en el archivo `app.js` e indica el puerto que el servidor va a estar escuchando para resolver peticiones. Para trabajar en local hemos establecido que el puerto de escucha sea el 3000, este puerto se puede cambiar por cualquier otro que no esté reservado o en uso. Si vamos a instalar la aplicación en un servidor de acceso público tendremos que cambiar obligatoriamente este puerto por el 80, ya que este es el puerto por defecto a los navegadores hacer las peticiones por defecto.

```
app.set('port', process.env.PORT || 3000);
```

5.- Lanzar el servidor con el comando `node`

```
node app.js
```

Si vas a tu navegador, en la dirección [http://localhost:3000](http://localhost:3000) tendrás el servidor disponible.
