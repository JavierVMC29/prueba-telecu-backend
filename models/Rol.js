const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');

const Rol = sequelize.define(
  'Rol',
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
    tableName: 'roles'
  }
);

module.exports = Rol;
