const { Departamento } = require('../models');

const getAll = async (req, res) => {
  try {
    const departamentos = await Departamento.findAll({});
    return res.json(departamentos);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Error al obtener los departamentos' });
  }
};

const getById = async (req, res) => {
  try {
    const departamento = await Departamento.findByPk(req.params.id);
    return res.json(departamento);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el departamento' });
  }
};

module.exports = {
  getAll,
  getById
};
