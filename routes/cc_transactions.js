const express = require('express');

const {addCC_Trans,
    findCC_Trans,
    findCC_TransById,
    deleteCC_Trans,
    updateCC_Trans
    } = require('../controllers/cc_transactions');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/cc_transactions', validateToken, addCC_Trans);
// GET
router.get('/api/v1/cc_transactions', findCC_Trans);
router.get('/api/v1/cc_transactions/:id', validateToken, findCC_TransById);

// DELETE
router.delete('/api/v1/cc_transactions/:id', deleteCC_Trans);
// PUT
router.put('/api/v1/cc_transactions/:id', updateCC_Trans);
// EXPORTAR
module.exports = router

