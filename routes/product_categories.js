const express = require('express');

const {addProduct_Cat,
    findProduct_Cat,
    findProduct_CatById,
    deleteProduct_Cat,
    updateProduct_Cat
    } = require('../controllers/product_categories');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/product_categories', validateToken, addProduct_Cat);
// GET
router.get('/api/v1/product_categories', findProduct_Cat);
router.get('/api/v1/product_categories/:id', validateToken, findProduct_CatById);

// DELETE
router.delete('/api/v1/product_categories/:id', deleteProduct_Cat);
// PUT
router.put('/api/v1/product_categories/:id', updateProduct_Cat);
// EXPORTAR
module.exports = router
