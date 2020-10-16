const express = require('express');

const {addCoupon,
    findCoupon,
    findCouponById,
    deleteCoupon,
    updateCoupon
    } = require('../controllers/coupons');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/coupons', validateToken, addCoupon);
// GET
router.get('/api/v1/coupons', findCoupon);
router.get('/api/v1/coupons/:id', validateToken, findCouponById);

// DELETE
router.delete('/api/v1/coupons/:id', deleteCoupon);
// PUT
router.put('/api/v1/coupons/:id', updateCoupon);
// EXPORTAR
module.exports = router
