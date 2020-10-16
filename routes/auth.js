const express = require('express');
const {login, logout, resetPassword, updatePassword} = require('../controllers/auth');

const router = express.Router();

router.post('/api/v1/users/login', login);
router.post('/api/v1/users/update-password', updatePassword);
router.post('/api/v1/users/logout', logout);
router.post('/api/v1/users/reset-password', resetPassword);


//Export default
module.exports = router;
