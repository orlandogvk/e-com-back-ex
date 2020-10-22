const express = require('express');

const {addSession,
    findSession,
    findSessionById,
    deleteSession,
    updateSession
    } = require('../controllers/sessions');
const router = express.Router();
const {validateToken,grantAccess} = require('../middlewares/auth');


// POST
router.post('/api/v1/sessions', validateToken,grantAccess('createAny', 'Sessions'), addSession);
// GET
router.get('/api/v1/sessions',validateToken,grantAccess('readAny', 'Sessions'), findSession);
router.get('/api/v1/sessions/:id', validateToken, findSessionById);

// DELETE
router.delete('/api/v1/sessions/:id',validateToken,grantAccess('deleteAny', 'Sessions'), deleteSession);
// PUT
router.put('/api/v1/sessions/:id',validateToken,grantAccess('updateAny', 'Sessions'), updateSession);
// EXPORTAR
module.exports = router

