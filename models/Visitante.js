const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');

const Visitante = sequelize.define(
  'Visitante',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'visitantes'
  }
);

module.exports = Visitante;
