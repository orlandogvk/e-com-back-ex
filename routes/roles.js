const express = require('express');

const {addRole,
    findRole,
    findRoleById,
    deleteRole,
    updateRole
    } = require('../controllers/roles');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/roles', validateToken, addRole);
// GET
router.get('/api/v1/roles', findRole);
router.get('/api/v1/roles/:id', validateToken, findRoleById);

// DELETE
router.delete('/api/v1/roles/:id', deleteRole);
// PUT
router.put('/api/v1/roles/:id', updateRole);
// EXPORTAR
module.exports = router

