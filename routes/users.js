const express = require('express');
const {addUser,
    findUsers,
    findById,
    deleteUser,
    updateUser,
    me,} = require('../controllers/users');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/users', validateToken, addUser);
// GET
router.get('/api/v1/users', findUsers);
router.get('/api/v1/users/:id', validateToken, findById);
router.get('/api/v1/users/me', me);
// DELETE
router.delete('/api/v1/users/:id', deleteUser);
// PUT
router.put('/api/v1/users/:id', updateUser);
// EXPORTAR
module.exports = router
