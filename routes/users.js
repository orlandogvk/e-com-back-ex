const express = require('express');
const {addUser,
    findById,
    searchUser,
    deleteUser,
    updateUser,
    me,} = require('../controllers/users');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/users', validateToken, grantAccess('createAny', 'Users'), addUser);
// GET
router.get('/api/v1/users',validateToken, grantAccess('readAny', 'Users'), searchUser);
router.get('/api/v1/users/:id', validateToken, findById);
router.get('/api/v1/users/me', me);
// DELETE
router.delete('/api/v1/users/:id',validateToken, grantAccess('deleteAny', 'Users'), deleteUser);
// PUT
router.put('/api/v1/users/:id',validateToken, grantAccess('updateAny', 'Users'), updateUser);
// EXPORTAR
module.exports = router
