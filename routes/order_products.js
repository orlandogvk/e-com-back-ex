const express = require('express');

const {addOrder_Product,
    findOrder_Product,
    findOrder_ProductById,
    searchOrderProductByPage,
    deleteOrder_Product,
    updateOrder_Product
    } = require('../controllers/order_products');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/order_products', validateToken, addOrder_Product);
// GET
router.get('/api/v1/order_products', findOrder_Product);
router.get('/api/v1/order_products/search', searchOrderProductByPage);
router.get('/api/v1/order_products/:id', validateToken, findOrder_ProductById);

// DELETE
router.delete('/api/v1/order_products/:id', deleteOrder_Product);
// PUT
router.put('/api/v1/order_products/:id', updateOrder_Product);
// EXPORTAR
module.exports = router
