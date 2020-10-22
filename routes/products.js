const express = require('express');

const {addProduct,
    searchProduct,
    findProductById,
    searchProductByPage,
    deleteProduct,
    updateProduct
    } = require('../controllers/products');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/products', validateToken, addProduct);
// GET
router.get('/api/v1/products',validateToken,grantAccess('readAny', 'Products'), searchProduct);
router.get('/api/v1/products/search', searchProductByPage);
router.get('/api/v1/products/:id', validateToken, findProductById);

// DELETE
router.delete('/api/v1/products/:id', deleteProduct);
// PUT
router.put('/api/v1/products/:id', updateProduct);
// EXPORTAR
module.exports = router

