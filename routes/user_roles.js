const express = require('express');

const {addUser_Role,
    findUser_Role,
    findUser_RoleById,
    deleteUser_Role,
    updateUser_Role
    } = require('../controllers/user_roles');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/user_roles', validateToken,grantAccess('createAny', 'User_Roles'), addUser_Role);
// GET
router.get('/api/v1/user_roles', validateToken,grantAccess('readAny', 'User_Roles'),findUser_Role);
router.get('/api/v1/user_roles/:id', validateToken, findUser_RoleById);

// DELETE
router.delete('/api/v1/user_roles/:id',validateToken,grantAccess('deleteAny', 'User_Roles'), deleteUser_Role);
// PUT
router.put('/api/v1/user_roles/:id',validateToken,grantAccess('updateAny', 'User_Roles'), updateUser_Role);
// EXPORTAR
module.exports = router

