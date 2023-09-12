const { Usuario, Rol } = require('../models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Usuario.findOne({
      where: { username },
      include: [{ model: Rol }]
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, username, role: user.Rol.nombre },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      );

      // Crear un nuevo objeto con los datos necesarios, incluyendo el token
      const userWithToken = {
        user: {
          id: user.id,
          username: user.username,
          role: user.Rol.nombre
        },
        serviceToken: token
      };

      return res.status(200).json(userWithToken);
    }
    return res.status(400).send('Credenciales invalidas');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Ocurrio un error');
  }
};

module.exports = { login };
