Como contribuir
===============

Guía de cómo contribuir al proyecto de [transparente-ugr](https://github.com/oslugr/ugr-transparente-servidor)


## Realizar Cambios
Todos los cambios se deberán realizar en la [dev](https://github.com/oslugr/ugr-transparente-servidor/tree/dev) o en otra rama si procede a excepción de master. (en ningún caso se aceptarán cambios directos a master)

### Tests
Todos los cambios deberán pasar los tests para ser aceptados y asegurar su funcionamiento, ejecutar `npm test` en el proyecto local **antes** de subir cualquier cambio.

Todas las ramas se encuentran bajo integración continua con [TravisCI](https://travis-ci.org/oslugr/ugr-transparente-servidor), estos tests deberán superarse para aceptar los cambios

El proyecto posee badges que marcan el estado actual de la rama master:
* [![Build Status](https://travis-ci.org/oslugr/ugr-transparente-servidor.svg?branch=master)](https://travis-ci.org/oslugr/ugr-transparente-servidor)    
* [![Coverage Status](https://coveralls.io/repos/github/oslugr/ugr-transparente-servidor/badge.svg?branch=master)](https://coveralls.io/github/oslugr/ugr-transparente-servidor?branch=master)


### Issues
Se puede observar el estado actual del desarrollo (tareas por realizar, bugs...) en la ventana de [issues](https://github.com/oslugr/ugr-transparente-servidor/issues), para añadir nuevos issues es imprescindible comprobar que no se encuentra duplicado y explicar la razón del issue

### Documentación
La documentación se realizará mediante comentarios escritos con **markdown**, la herramienta [Groc](https://github.com/nevir/groc) generará documentación en html a partir de estos comentarios (configuración en el archivo `.groc.json`)

Para generar la documentación usar: `npm run doc`

La documentación deberá seguir las siguientes normas y la guía de estilo de Markdown (mirar abajo):
* Los comentarios para generar deberán empezar con un espacio:
  * `// Ejemplo de comentario`
* Los comentarios sin espacio al principio **no** generarán documentación
  * `//Comentario puntual`
* Evitar usar bloques de comentario (`/* ... */`) salvo que sea necesario
  * Los bloques de comentario siguen las mismas normas que los comentarios normales (`/*Esto no genera documentacion*/`)

## Guía de estilo

### JavaScript
El código desarrollado seguirá los estándares de JavaScript dados por **jshint** además del uso de notación _cameCase_ tanto para archivos como variables y funciones (las clases comenzarán por mayúscula, de acuerdo al estandar). Ejecutar el comando `npm run jshint` para comprobar si el código sigue los estándares

Todo el código de JS debe ser legible e indentado de una forma estándar, para realizar indentación automática, ejecutar `npm run beautify` y asegurar que el código modificado se encuentra en la lista de archivos de js-beautify

>Importante indicar si npm run beautify no ha funcionado correctamente, o no modifica un archivo necesario mediante un issue

El código en **JSON** seguirá los mismos principios

### Markdown
* El texto en **negrita** se escribirá con doble asterisco (`**ejemplo**`)
* El texto en _cursiva_ se escribirá con barra baja (`_ejemplo_`)

### JADE
El código en jade se tabulará con tabuladores. Se recomienda usar jade-beautify
