const express = require('express');

const {addCoupon,
    findCoupon,
    findCouponById,
    deleteCoupon,
    updateCoupon
    } = require('../controllers/coupons');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/coupons', validateToken,grantAccess('createAny', 'Coupons'), addCoupon);
// GET
router.get('/api/v1/coupons',validateToken,grantAccess('readAny', 'Coupons'), findCoupon);
router.get('/api/v1/coupons/:id', validateToken, findCouponById);

// DELETE
router.delete('/api/v1/coupons/:id', deleteCoupon);
// PUT
router.put('/api/v1/coupons/:id',validateToken,grantAccess('updateAny', 'Coupons'), updateCoupon);
// EXPORTAR
module.exports = router
