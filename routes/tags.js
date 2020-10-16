const express = require('express');

const {addTag,
    findTag,
    findTagById,
    deleteTag,
    updateTag
    } = require('../controllers/tags');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/tags', validateToken, addTag);
// GET
router.get('/api/v1/tags', findTag);
router.get('/api/v1/tags/:id', validateToken, findTagById);

// DELETE
router.delete('/api/v1/tags/:id', deleteTag);
// PUT
router.put('/api/v1/tags/:id', updateTag);
// EXPORTAR
module.exports = router

