const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const filmSchema = mongoose.Schema({
    netflixid: { type: Number, required: true, unique: true },
    title: { type: String, required: false },
    synopsis: { type: String, required: false },
    synopsisVector: { type: Array, required: false },
    img: { type: String, required: false },
    year: { type: Number, required: false },
    poster: { type: String, required: false },
    genre: { type: Array, required: false },
    genreVectors: { type: Array, required: false },
    runtime: { type: String, required: false },
    coutry: { type: Number, required: false },
    language: { type: String, required: false },
    plot: { type: String, required: false },
    country: { type: String, required: false },
});

filmSchema.plugin(uniqueValidator);
  
module.exports = mongoose.model('Film', filmSchema);