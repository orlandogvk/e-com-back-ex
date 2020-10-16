const express = require('express');

const {addProduct_Stat,
    findProduct_Stat,
    findProduct_StatById,
    deleteproduct_Stat,
    updateProduct_Stat
    } = require('../controllers/product_statuses');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/product_statuses', validateToken, addProduct_Stat);
// GET
router.get('/api/v1/product_statuses', findProduct_Stat);
router.get('/api/v1/product_statuses/:id', validateToken, findProduct_StatById);

// DELETE
router.delete('/api/v1/product_statuses/:id', deleteproduct_Stat);
// PUT
router.put('/api/v1/product_statuses/:id', updateProduct_Stat);
// EXPORTAR
module.exports = router
