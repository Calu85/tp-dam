TRABAJO PRÁCTICO - DESARROLLO DE APLICACIONES MULTIPLATAFORMA
========================================

Proyecto basado en [Web App Full Stack Base](https://github.com/gotoiot/app-fullstack-base).

En esta extensión del proyecto se utiliza el framework ionic para realizar el frontend.

## Comenzando

Esta sección es una guía con los pasos esenciales para que puedas poner en marcha la aplicación.

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`. 


### Ejecutar la aplicación

1) Por única vez luego de clonar el repo, correr el comando `npm install` dentro de la carpeta "src/backend".
2) En la raiz del proyecto, correr el comando `docker compose up`.

Para acceder al cliente web ingresa a a la URL [http://localhost:8100/](http://localhost:8100/) y para acceder al admin de la DB accedé a [localhost:8001/](http://localhost:8001/). 

Si pudiste acceder al cliente web y al administrador significa que la aplicación se encuentra corriendo bien. 

> Si te aparece un error la primera vez que corres la app, deteńe el proceso y volvé a iniciarla. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

