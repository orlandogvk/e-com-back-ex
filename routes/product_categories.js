const express = require('express');

const {addProduct_Cat,
    findProduct_Cat,
    findProduct_CatById,
    deleteProduct_Cat,
    updateProduct_Cat
    } = require('../controllers/product_categories');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/product_categories', validateToken,grantAccess('createAny', 'Product_Categories'), addProduct_Cat);
// GET
router.get('/api/v1/product_categories',validateToken,grantAccess('readAny', 'Product_Categories'), findProduct_Cat);
router.get('/api/v1/product_categories/:id', validateToken, findProduct_CatById);

// DELETE
router.delete('/api/v1/product_categories/:id',validateToken,grantAccess('deleteAny', 'Product_Categories'), deleteProduct_Cat);
// PUT
router.put('/api/v1/product_categories/:id',validateToken,grantAccess('updateAny', 'Product_Categories'), updateProduct_Cat);
// EXPORTAR
module.exports = router
