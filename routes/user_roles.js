const express = require('express');

const {addUser_Role,
    findUser_Role,
    findUser_RoleById,
    deleteUser_Role,
    updateUser_Role
    } = require('../controllers/user_roles');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/user_roles', validateToken, addUser_Role);
// GET
router.get('/api/v1/user_roles', findUser_Role);
router.get('/api/v1/user_roles/:id', validateToken, findUser_RoleById);

// DELETE
router.delete('/api/v1/user_roles/:id', deleteUser_Role);
// PUT
router.put('/api/v1/user_roles/:id', updateUser_Role);
// EXPORTAR
module.exports = router

