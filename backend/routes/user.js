const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
const user = require('../models/user');

router.post('/inscription', userCtrl.createUser);
router.post('/connexion', userCtrl.connectUser);
router.post('/check_username', userCtrl.verifUsername);
router.post('/check_infouser', auth, userCtrl.checkInfoUser);

module.exports = router;