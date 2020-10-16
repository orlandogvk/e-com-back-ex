const express = require('express');

const {addSession,
    findSession,
    findSessionById,
    deleteSession,
    updateSession
    } = require('../controllers/sessions');
const router = express.Router();
const validateToken = require('../middlewares/auth');


// POST
router.post('/api/v1/sessions', validateToken, addSession);
// GET
router.get('/api/v1/sessions', findSession);
router.get('/api/v1/sessions/:id', validateToken, findSessionById);

// DELETE
router.delete('/api/v1/sessions/:id', deleteSession);
// PUT
router.put('/api/v1/sessions/:id', updateSession);
// EXPORTAR
module.exports = router

