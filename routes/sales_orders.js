const express = require('express');

const {addSale_Order,
    findSale_Order,
    findSale_OrderById,
    deleteSale_Order,
    updateSale_Order
    } = require('../controllers/sales_orders');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/sales_orders', validateToken,grantAccess('createOwn', 'Sales_Orders'),grantAccess('createAny', 'Sales_Orders'), addSale_Order);
// GET
router.get('/api/v1/sales_orders',validateToken,grantAccess('readOwn', 'Sales_Orders'),validateToken,grantAccess('readAny', 'Sales_Orders'), findSale_Order);

router.get('/api/v1/sales_orders/:id', validateToken, findSale_OrderById);

// DELETE
router.delete('/api/v1/sales_orders/:id',validateToken,grantAccess('deleteAny', 'Sales_Orders'), deleteSale_Order);
// PUT
router.put('/api/v1/sales_orders/:id',validateToken,grantAccess('updateAny', 'Sales_Orders'), updateSale_Order);
// EXPORTAR
module.exports = router

