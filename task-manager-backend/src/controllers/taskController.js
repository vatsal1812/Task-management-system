const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: 'Task not found' });
  }
};

exports.updateTask = async (req, res) => {
  const task = await Task.update(req.body, { where: { id: req.params.id } });
  res.status(200).json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.destroy({ where: { id: req.params.id } });
  res.status(200).send('Task deleted');
};
