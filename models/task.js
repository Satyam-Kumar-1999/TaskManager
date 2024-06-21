const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Team = require('./team');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium',
    },
    status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
    },
}, {
    timestamps: true,
});

Task.belongsTo(User, { as: 'assignee' });
Task.belongsTo(Team);

module.exports = Task;