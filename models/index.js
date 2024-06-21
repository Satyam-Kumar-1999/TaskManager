const sequelize = require('../config/database');
const User = require('./user');
const Team = require('./team');
const Task = require('./task');
const TeamUser = require('./teamUser');

User.belongsToMany(Team, { through: TeamUser });
Team.belongsToMany(User, { through: TeamUser });

sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database', err));

module.exports = { User, Team, Task, TeamUser };