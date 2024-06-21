const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Team = require('./team');

const TeamUser = sequelize.define('TeamUser', {
    role: {
        type: DataTypes.ENUM('member', 'admin'),
        defaultValue: 'member',
        allowNull: false // Ensure role cannot be null
    }
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

// Define associations
TeamUser.belongsTo(User, { foreignKey: 'UserId' }); // This adds UserId to TeamUser
TeamUser.belongsTo(Team, { foreignKey: 'TeamId' }); // This adds TeamId to TeamUser

module.exports = TeamUser;