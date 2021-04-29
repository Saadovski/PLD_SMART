const mongoose = require('mongoose');

const preferenceSchema = mongoose.Schema({
    genre: { type: String, required: true },
    annee: { type: Number, required: false },
    pays:  { type: String, required: false },
    nbFilms:  { type: Number, required: false },   

});
  
module.exports = mongoose.model('Preference', preferenceSchema);