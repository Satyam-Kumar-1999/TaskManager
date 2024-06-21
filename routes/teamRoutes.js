const express = require('express');
const {
    createTeam,
    getTeams,
    getTeam,
    updateTeam,
    deleteTeam,
    addUserToTeam,
    getTeamMembers,
} = require('../controllers/teamController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createTeam);
router.get('/', getTeams);
router.get('/:id', getTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);
router.post('/:id/users', addUserToTeam);
router.get('/:id/users', getTeamMembers);

module.exports = router;