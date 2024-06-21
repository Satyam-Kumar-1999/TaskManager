const { Task, User, Team } = require('../models');

exports.createTask = async (req, res) => {
    const { title, description, priority, assigneeId, teamId } = req.body;

    try {
        const task = await Task.create({ title, description, priority, assigneeId, teamId });

        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const teamId = req.query.team;

        const where = teamId ? { teamId } : { assigneeId: userId };
        const tasks = await Task.findAll({ where });

        res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: [
                { model: User, as: 'assignee' },
                { model: Team },
            ]
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, priority, status, assigneeId } = req.body;

    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.title = title;
        task.description = description;
        task.priority = priority;
        task.status = status;
        task.assigneeId = assigneeId;

        await task.save();

        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.destroy();

        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};