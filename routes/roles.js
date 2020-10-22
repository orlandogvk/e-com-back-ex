const express = require('express');

const {addRole,
    findRole,
    findRoleById,
    deleteRole,
    updateRole
    } = require('../controllers/roles');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/roles', validateToken,grantAccess('createAny', 'Roles'), addRole);
// GET
router.get('/api/v1/roles',validateToken,grantAccess('readAny', 'Roles'), findRole);
router.get('/api/v1/roles/:id', validateToken, findRoleById);

// DELETE
router.delete('/api/v1/roles/:id',validateToken,grantAccess('deleteAny', 'Roles'), deleteRole);
// PUT
router.put('/api/v1/roles/:id',validateToken,grantAccess('updateAny', 'Roles'), updateRole);
// EXPORTAR
module.exports = router

