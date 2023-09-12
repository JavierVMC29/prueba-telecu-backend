const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');

const Departamento = sequelize.define(
  'Departamento',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'departamentos'
  }
);

module.exports = Departamento;
