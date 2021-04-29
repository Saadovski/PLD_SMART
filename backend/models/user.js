const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    preference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Preference"
      }
});
  
module.exports = mongoose.model('User', userSchema);