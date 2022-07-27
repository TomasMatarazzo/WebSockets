const express = require('express')
const router = express.Router();
const {login , logout , renderLogin} = require('../controller/sessionController')

router.get('/login',  renderLogin)
router.get('/login2',login)
router.get('/logout',logout)

module.exports = router