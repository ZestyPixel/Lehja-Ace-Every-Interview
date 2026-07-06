const express = require('express');
const registeration = require('../controllers/registration');
const login = require('../controllers/login');
const verify = require('../middlewares/authentication');
const newAccessToken = require('../controllers/newAccessToken');
const logout = require('../controllers/logout');
const router = express.Router();

router.post('/register', registeration);
router.post('/login', login);
router.post('/newAccessToken', newAccessToken);
router.post('/logout', verify, logout);

module.exports = router;