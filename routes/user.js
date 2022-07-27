const express = require('express')
const router = express.Router();
const {login , logout , renderLogin} = require('../controller/sessionController')

router.post('/login',login)
router.get('/login',renderLogin)
router.get('/logout',logout)

module.exports = router