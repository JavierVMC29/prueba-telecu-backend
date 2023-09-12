const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');

const Visita = sequelize.define(
  'Visita',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    motivo_visita: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    novedad: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  },
  {
    tableName: 'visitas'
  }
);

module.exports = Visita;
