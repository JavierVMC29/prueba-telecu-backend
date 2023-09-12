const Usuario = require('./Usuario');
const Rol = require('./Rol');
const Departamento = require('./Departamento');
const Visitante = require('./Visitante');
const Visita = require('./Visita');

function setupAssociations() {
  Usuario.belongsTo(Rol, {
    foreignKey: {
      name: 'rol_id',
      allowNull: false
    }
  });

  Visita.belongsTo(Visitante, {
    foreignKey: {
      name: 'visitante_id',
      allowNull: false
    }
  });

  Visita.belongsTo(Departamento, {
    foreignKey: {
      name: 'departamento_id',
      allowNull: false
    }
  });
}

setupAssociations();

const models = {
  Usuario,
  Rol,
  Departamento,
  Visitante,
  Visita
};

module.exports = models;
