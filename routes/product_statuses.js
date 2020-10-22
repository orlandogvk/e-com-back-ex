const express = require('express');

const {addProduct_Stat,
    findProduct_Stat,
    findProduct_StatById,
    deleteproduct_Stat,
    updateProduct_Stat
    } = require('../controllers/product_statuses');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/product_statuses', validateToken,grantAccess('createAny', 'Product_Statuses'), addProduct_Stat);
// GET
router.get('/api/v1/product_statuses',validateToken,grantAccess('readAny', 'Product_Statuses'), findProduct_Stat);
router.get('/api/v1/product_statuses/:id', validateToken, findProduct_StatById);

// DELETE
router.delete('/api/v1/product_statuses/:id',validateToken,grantAccess('deleteAny', 'Product_Statuses'), deleteproduct_Stat);
// PUT
router.put('/api/v1/product_statuses/:id',validateToken,grantAccess('updateAny', 'Product_Statuses'), updateProduct_Stat);
// EXPORTAR
module.exports = router
