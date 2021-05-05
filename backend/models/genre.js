const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const filmSchema = mongoose.Schema({
    genre: { type: Array, required: false },
    vector: { type: Array, required: false },
});

filmSchema.plugin(uniqueValidator);
  
module.exports = mongoose.model('genre', filmSchema);