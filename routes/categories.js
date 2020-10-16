const express = require('express');
const {addCategory,
    findCategory,
    findCatById,
    deleteCategory,
    updateCategory
    } = require('../controllers/categories');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/categories', validateToken, addCategory);
// GET
router.get('/api/v1/categories', findCategory);
router.get('/api/v1/categories/:id', validateToken, findCatById);

// DELETE
router.delete('/api/v1/categories/:id', deleteCategory);
// PUT
router.put('/api/v1/categories/:id', updateCategory);
// EXPORTAR
module.exports = router