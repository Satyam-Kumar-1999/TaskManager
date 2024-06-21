const { Team, TeamUser, User } = require('../models');

exports.createTeam = async (req, res) => {
    const { name } = req.body;

    try {
        const team = await Team.create({ name });
        await TeamUser.create({ teamId: team.id, userId: req.user.id, role: 'admin' });

        res.status(201).json(team);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll({
            include: {
                model: User,
                where: { id: req.user.id },
                through: { attributes: ['role'] }
            }
        });

        res.status(200).json(teams);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        res.status(200).json(team);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateTeam = async (req, res) => {
    const { name } = req.body;

    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        team.name = name;
        await team.save();

        res.status(200).json(team);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        await team.destroy();

        res.status(200).json({ message: 'Team deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addUserToTeam = async (req, res) => {
    const { userId, role } = req.body;

    try {
        const teamUser = await TeamUser.create({ teamId: req.params.id, userId, role });

        res.status(201).json(teamUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getTeamMembers = async (req, res) => {
    try {
        const teamUsers = await TeamUser.findAll({ where: { teamId: req.params.id }, include: [User] });

        res.status(200).json(teamUsers);
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
};