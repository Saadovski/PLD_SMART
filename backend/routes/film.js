const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const filmCtrl = require('../controllers/film');
const user = require('../models/film');

router.post('/create_film', filmCtrl.createFilm);


module.exports = router;