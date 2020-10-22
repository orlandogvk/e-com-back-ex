const express = require('express');

const {addOrder_Product,
    findOrder_Product,
    findOrder_ProductById,
    searchOrderProductByPage,
    deleteOrder_Product,
    updateOrder_Product
    } = require('../controllers/order_products');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/order_products', validateToken,grantAccess('createAny', 'Order_Products'), addOrder_Product);
// GET
router.get('/api/v1/order_products',validateToken,grantAccess('readAny', 'Order_Products'),grantAccess('readOwn', 'Order_Products'), findOrder_Product);
router.get('/api/v1/order_products/search', searchOrderProductByPage);
router.get('/api/v1/order_products/:id', validateToken, findOrder_ProductById);

// DELETE
router.delete('/api/v1/order_products/:id',validateToken,grantAccess('deleteAny', 'Order_Products'), deleteOrder_Product);
// PUT
router.put('/api/v1/order_products/:id',validateToken,grantAccess('updateAny', 'Order_Products'),updateOrder_Product);
// EXPORTAR
module.exports = router
