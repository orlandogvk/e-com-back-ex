const express = require('express');

const {addProduct_Tag,
    findProduct_Tag,
    findProduct_TagById,
    deleteProduct_Tag,
    updateProduct_Tag
    } = require('../controllers/product_tags');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/product_tags', validateToken, addProduct_Tag);
// GET
router.get('/api/v1/product_tags', findProduct_Tag);
router.get('/api/v1/product_tags/:id', validateToken, findProduct_TagById);

// DELETE
router.delete('/api/v1/product_tags/:id', deleteProduct_Tag);
// PUT
router.put('/api/v1/product_tags/:id', updateProduct_Tag);
// EXPORTAR
module.exports = router

