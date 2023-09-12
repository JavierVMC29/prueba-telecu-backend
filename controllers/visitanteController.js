const { Visitante } = require('../models');
const { getPagination, getPagingData } = require('../utils/pagination');

const getAll = async (req, res) => {
  try {
    const { pageNo, pageSize } = req.query;
    const { limit, offset } = getPagination(pageNo, pageSize);

    const visitantes = await Visitante.findAndCountAll({ limit, offset });

    const visitantesPaging = getPagingData(visitantes, pageNo, limit);

    return res.json(visitantesPaging);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los visitantes' });
  }
};

const getByCedula = async (req, res) => {
  try {
    const visitante = await Visitante.findOne({
      where: { cedula: req.params.cedula }
    });
    return res.json(visitante);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el visitante' });
  }
};

const getById = async (req, res) => {
  try {
    const visitante = await Visitante.findByPk(req.params.id);
    return res.json(visitante);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el visitante' });
  }
};

const create = async (req, res) => {
  try {
    const { nombres, apellidos, cedula } = req.body;

    const visitante = await Visitante.create({
      nombres,
      apellidos,
      cedula
    });

    return res.status(201).json(visitante);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el visitante' });
  }
};

const update = async (req, res) => {
  try {
    const { nombres, apellidos, cedula } = req.body;

    const fieldsToUpdate = {};

    // Only add non-null fields to the fieldsToUpdate object
    if (nombres !== null) fieldsToUpdate.nombres = nombres;
    if (apellidos !== null) fieldsToUpdate.apellidos = apellidos;
    if (cedula !== null) fieldsToUpdate.cedula = cedula;

    // Perform the update with only the non-null fields
    await Visitante.update(fieldsToUpdate, { where: { id: req.params.id } });

    // Fetch the updated record and return it in the response
    const updatedVisitante = await Visitante.findByPk(req.params.id);
    return res.status(200).json(updatedVisitante);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el visitante' });
  }
};

const destroy = async (req, res) => {
  try {
    await Visitante.destroy({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la visitante' });
  }
};

module.exports = {
  getAll,
  getById,
  getByCedula,
  create,
  update,
  destroy
};
