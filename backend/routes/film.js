const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const filmCtrl = require('../controllers/film');
const user = require('../models/film');

router.post('/create_film', filmCtrl.createFilm);
router.post('/get_film_by_gender', filmCtrl.filmGender);
router.post('/updatePreference', filmCtrl.updatePreference);

module.exports = router;