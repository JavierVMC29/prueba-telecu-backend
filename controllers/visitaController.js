const { Visita, Visitante, Departamento } = require('../models');
const { getPagination, getPagingData } = require('../utils/pagination');

const estados = ['EN CURSO', 'FINALIZADO'];

const getAll = async (req, res) => {
  try {
    const { pageNo, pageSize } = req.query;
    const { limit, offset } = getPagination(pageNo, pageSize);

    const visitas = await Visita.findAndCountAll({
      include: [{ all: true }],
      limit,
      offset
    });

    const visitasPaging = getPagingData(visitas, pageNo, limit);

    return res.json(visitasPaging);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las visitas' });
  }
};

const getById = async (req, res) => {
  try {
    const visita = await Visita.findByPk(req.params.id, {
      include: [{ all: true }]
    });
    return res.json(visita);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la visita' });
  }
};

const create = async (req, res) => {
  try {
    const {
      fecha,
      hora,
      fecha_ingreso,
      motivo_visita,
      estado,
      novedad,
      visitante_id,
      departamento_id
    } = req.body;

    const visitante = await Visitante.findByPk(visitante_id);
    if (visitante === null) {
      return res.status(400).json({ message: 'Visitante no existe' });
    }

    const departamento = await Departamento.findByPk(departamento_id);
    if (departamento === null) {
      return res.status(400).json({ message: 'Departamento no existe' });
    }

    if (!estados.includes(estado)) {
      return res
        .status(400)
        .json({ message: 'Estado debe ser uno de: [EN CURSO, FINALIZADO]' });
    }

    const visita = await Visita.create({
      fecha,
      hora,
      fecha_ingreso,
      motivo_visita,
      estado,
      novedad,
      visitante_id,
      departamento_id
    });

    return res.status(201).json(visita);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al crear la visita' });
  }
};

const update = async (req, res) => {
  try {
    const {
      fecha,
      hora,
      fecha_ingreso,
      motivo_visita,
      estado,
      novedad,
      visitante_id,
      departamento_id
    } = req.body;

    if (visitante_id) {
      const visitante = await Visitante.findByPk(visitante_id);
      if (visitante === null) {
        return res.status(400).json({ message: 'Visitante no existe' });
      }
    }

    if (departamento_id) {
      const departamento = await Departamento.findByPk(departamento_id);
      if (departamento === null) {
        return res.status(400).json({ message: 'Departamento no existe' });
      }
    }

    if (estado && !estados.includes(estado)) {
      return res
        .status(400)
        .json({ message: 'Estado debe ser uno de: [EN CURSO, FINALIZADO]' });
    }

    const fieldsToUpdate = {};

    // Only add non-null fields to the fieldsToUpdate object
    if (fecha !== null) fieldsToUpdate.fecha = fecha;
    if (hora !== null) fieldsToUpdate.hora = hora;
    if (fecha_ingreso !== null) fieldsToUpdate.fecha_ingreso = fecha_ingreso;
    if (motivo_visita !== null) fieldsToUpdate.motivo_visita = motivo_visita;
    if (estado !== null) fieldsToUpdate.estado = estado;
    if (novedad !== null) fieldsToUpdate.novedad = novedad;
    if (visitante_id !== null) fieldsToUpdate.visitante_id = visitante_id;
    if (departamento_id !== null)
      fieldsToUpdate.departamento_id = departamento_id;

    // Perform the update with only the non-null fields
    await Visita.update(fieldsToUpdate, { where: { id: req.params.id } });

    // Fetch the updated record and return it in the response
    const updatedVisita = await Visita.findByPk(req.params.id);
    return res.status(200).json(updatedVisita);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la visita' });
  }
};

const destroy = async (req, res) => {
  try {
    await Visita.destroy({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la visita' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
};
