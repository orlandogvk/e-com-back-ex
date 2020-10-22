const express = require('express');

const {addCC_Trans,
    findCC_Trans,
    findCC_TransById,
    deleteCC_Trans,
    updateCC_Trans
    } = require('../controllers/cc_transactions');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/cc_transactions', validateToken,grantAccess('createOwn', 'CC_Transactions'),grantAccess('createAny', 'CC_Transactions'), addCC_Trans);
// GET
router.get('/api/v1/cc_transactions',validateToken,grantAccess('readOwn', 'CC_Transactions'),grantAccess('readAny', 'CC_Transactions'), findCC_Trans);
router.get('/api/v1/cc_transactions/:id', validateToken, findCC_TransById);

// DELETE
router.delete('/api/v1/cc_transactions/:id',validateToken,grantAccess('deleteAny', 'CC_Transactions'), deleteCC_Trans);
// PUT
router.put('/api/v1/cc_transactions/:id',validateToken,grantAccess('updateAny', 'CC_Transactions'), updateCC_Trans);
// EXPORTAR
module.exports = router

