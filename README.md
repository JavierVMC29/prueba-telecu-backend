# Prueba tecnica Telecu

Primero creo una carpeta para el proyecto donde tendre dos carpetas mas, una para el backend y otra para el frontend.

Empesare creando el backend con Nodejs y Express.

Para generar rapidamente el esqueleto de la aplicacion voy a usar `express-generator`.

En una terminal desde la carpeta backend uso el siguiente comando para generar el esqueleto de la aplicacion:

```shell
npx express-generator --no-view
```

Uso el flag `--no-view` para indicarle a `express-generator` que no quiero usar ningun view-engine, ya que toda la parte visual la hare con React en otra aplicacion.

En el `package.json` actualizo la version de express a `4.18.1`.

Ahora, instalo las dependencias con `npm install` e inicio la aplicacion con `npm start`.

Verifico que la aplicacion este corriendo en [http://localhost:3000](http://localhost:3000).

Ahora creo una base de datos en MySQL Workbench llamada `visitantes_db`.

```sql
CREATE DATABASE visitantes_db;
```

Para conectar el backend con la base de datos voy a usar [Sequelize](https://sequelize.org/).

Primero instalo las dependencias necesarias:

```shell
npm install dotenv mysql2 sequilize bcryptjs
```

Para conectarme a la base de datos voy a crear un archivo que exporte una instancia de sequilize en `db/dbConnection.js`

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
  }
);

async function test() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test();

module.exports = sequelize;
```

Las credenciales de la base de datos las pondre en el archivo `.env`:

```shell
ENVIRONMENT=dev

DATABASE_NAME=visitantes_db
DATABASE_USERNAME=root
DATABASE_PASSWORD=1234
DATABASE_HOST=localhost
DATABASE_DIALECT=mysql
```

Para que la aplicacion pueda leer el archivo `.env` hay que agregar `require('dotenv').config();` al comienzo del archivo `app.js`.

Segun los requerimientos establecidos, hago un diagrama de la base de datos:

_Poner diagrama aqui_

Ahora, por cada tabla tengo que crear un modelo como el siguiente:

```javascript
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db/dbConnection');

const Usuario = sequelize.define(
  'Usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hashedPassword);
      }
    }
  },
  {
    tableName: 'usuarios'
  }
);

module.exports = Usuario;
```

Voy a crear un directorio llamado `models` donde pondre un archivo por cada modelo y un archivo `index.js`. En el archivo `index.js` voy a importar todos los modelos y establecer las relaciones entre ellos.

```javascript
const Usuario = require('./Usuario');
const Rol = require('./Rol');
const Visita = require('./Visita');
const Visitante = require('./Visitante');
const Departamento = require('./Departamento');

function setupAssociations() {
  Usuario.belongsTo(Rol, {
    foreignKey: {
      name: 'rol_id'
    }
  });

  Visita.belongsTo(Visitante, {
    foreignKey: {
      name: 'visitante_id'
    }
  });

  Visita.belongsTo(Departamento, {
    foreignKey: {
      name: 'departamento_id'
    }
  });
}

setupAssociations();

const models = {
  Usuario,
  Rol,
  Visita,
  Visitante,
  Departamento
};

module.exports = models;
```

Ahora voy a crear una carpeta llamada `controllers` y dentro de esta voy a poner un archivo por cada controller. Hare un controller con operaciones CRUD para cada modelo.

```javascript
const { Usuario } = require('../models');

const getAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: [{ all: true }] });
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const getById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [{ all: true }]
    });
    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const create = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUsuario = await Usuario.findOne({
      where: { username }
    });

    if (existingUsuario) {
      return res
        .status(400)
        .json({ message: 'Nombre de usuario no disponible' });
    }

    const usuario = await Usuario.create({
      username,
      password
    });

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const update = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username) {
      const existingUsuario = await Usuario.findOne({
        where: { username }
      });

      if (
        existingUsuario &&
        existingUsuario.dataValues.id !== parseInt(req.params.id)
      ) {
        return res
          .status(400)
          .json({ message: 'Nombre de usuario no disponible' });
      }
    }

    const fieldsToUpdate = {};

    // Only add non-null fields to the fieldsToUpdate object
    if (username !== null) fieldsToUpdate.username = username;
    if (password !== null) fieldsToUpdate.password = password;

    // Perform the update with only the non-null fields
    await Usuario.update(fieldsToUpdate, { where: { id: req.params.id } });

    // Fetch the updated record and return it in the response
    const updatedUsuario = await Usuario.findByPk(req.params.id);
    return res.status(200).json(updatedUsuario);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const destroy = async (req, res) => {
  try {
    await Usuario.destroy({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
};
```

Ahora, voy a crear un archivo dentro de la carpeta routes por cada controller. Ademas, voy a usar `express-validator` para validar los parametros enviados por el cliente:

```javascript
const express = require('express');
const { body, param } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

const validate = require('../validator/index');

router.get('/', usuarioController.getAll);

router.get(
  '/:id',
  validate([param('id').trim().escape().isInt()]),
  usuarioController.getById
);

router.post(
  '/',
  validate([
    body('username')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('username is required')
      .isAlphanumeric()
      .withMessage('username must contain only alphanumeric characters'),
    body('password')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('password is required')
      .isStrongPassword()
      .withMessage('Week password')
  ]),
  usuarioController.create
);

router.put(
  '/:id',
  validate([
    param('id').trim().escape().isInt(),
    body('nombre_tipo')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('username is required')
      .isAlphanumeric()
      .withMessage('username must contain only alphanumeric characters'),
    body('descripcion')
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .withMessage('password is required')
      .isStrongPassword()
      .withMessage('Week password')
  ]),
  usuarioController.update
);

router.delete(
  '/:id',
  validate([param('id').trim().escape().isInt()]),
  usuarioController.destroy
);

module.exports = router;
```
