# Prueba tecnica Telecu

## Descripcion general

Para el proyecto usé NodeJS v18 con Express. La arquitectura de la aplicación es router-model-controller

Primero creo modelos para las tablas en la base de datos
Luego en los controllers hago las operaciones CRUD.
Finalmente, expongo en un endpoint las operaciones CRUD.

Para validar los datos ingresados por el cliente usé la librería `express-validator`
Para la creación de los modelos utilicé el ORM `Sequielize`.
Para las credenciales de la base de datos, usé la librería `dotenv` y definí las variables en un archivo `.env`:

Después de leer los requerimientos de la aplicación, diseñe la base de datos de la siguiente manera:
![database_diagram](https://github.com/JavierVMC29/prueba-telecu-backend/assets/79550227/b4b86ff6-ad2a-4a6e-a95a-82b3d1a58c89)


La autenticación la realicé con JWT con un endpoint `/login`, este recibe las credenciales del usuario y si son válidas le devuelve un token con su información. Este token es válido por 2 horas, una vez expirado ya no tendrá acceso a ningún endpoint que requiera el token. Para los permisos uso un middleware que da acceso al endpoint basándose en el rol del usuario.

## Como probarlo en local
1. Crear una base de datos en MySQL y ejecutar los queries del script `database_data.sql`.
2. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```shell
ENVIRONMENT=dev
DATABASE_NAME=visitantes_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=1234
DATABASE_HOST=localhost
DATABASE_DIALECT=mysql
```
3. Abrir una terminal en la raíz del proyecto y ejecutar los siguientes comandos:
```shell
npm install
npm run dev
```


