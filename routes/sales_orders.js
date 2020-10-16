const express = require('express');

const {addSale_Order,
    findSale_Order,
    findSale_OrderById,
    searchSalesOrderByPage,
    deleteSale_Order,
    updateSale_Order
    } = require('../controllers/sales_orders');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/sales_orders', validateToken, addSale_Order);
// GET
router.get('/api/v1/sales_orders', findSale_Order);
router.get('/api/v1/sales_orders/search', searchSalesOrderByPage);
router.get('/api/v1/sales_orders/:id', validateToken, findSale_OrderById);

// DELETE
router.delete('/api/v1/sales_orders/:id', deleteSale_Order);
// PUT
router.put('/api/v1/sales_orders/:id', updateSale_Order);
// EXPORTAR
module.exports = router

