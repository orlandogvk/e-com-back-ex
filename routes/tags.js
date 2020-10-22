const express = require('express');

const {addTag,
    findTag,
    findTagById,
    deleteTag,
    updateTag
    } = require('../controllers/tags');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/tags', validateToken,grantAccess('createAny', 'Tags'), addTag);
// GET
router.get('/api/v1/tags',validateToken,grantAccess('readAny', 'Tags'), findTag);
router.get('/api/v1/tags/:id', validateToken, findTagById);

// DELETE
router.delete('/api/v1/tags/:id',validateToken,grantAccess('deleteAny', 'Tags'), deleteTag);
// PUT
router.put('/api/v1/tags/:id',validateToken,grantAccess('updateAny', 'Tags'), updateTag);
// EXPORTAR
module.exports = router

