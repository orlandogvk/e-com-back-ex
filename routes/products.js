const express = require('express');

const {addProduct,
    findProduct,
    findProductById,
    deleteProduct,
    updateProduct
    } = require('../controllers/products');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/products', validateToken, addProduct);
// GET
router.get('/api/v1/products', findProduct);
router.get('/api/v1/products/:id', validateToken, findProductById);

// DELETE
router.delete('/api/v1/products/:id', deleteProduct);
// PUT
router.put('/api/v1/products/:id', updateProduct);
// EXPORTAR
module.exports = router

