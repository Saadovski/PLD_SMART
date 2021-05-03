const mongoose = require('mongoose');

const preferenceSchema = mongoose.Schema({
    genre: { type: Array, required: true },
    annee: { type: Number, required: false },
    nbFilms:  { type: Number, required: false },  
    synopsis:  { type: Array, required: false },

});
  
module.exports = mongoose.model('Preference', preferenceSchema);