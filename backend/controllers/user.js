const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Preference = require('../models/preference');

exports.createUser = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {

      //il faut transformer "profil" en vecteur
      const preference_ = new Preference({
        genre: req.body.profil
      });
      preference_.save()
      .then()
      .catch(error => res.status(400).json({ error }));

      const user = new User({
      username: req.body.username,
      password: hash,
      preference: preference_
      });

      user.save()
      .then(() => res.status(201).json({ message: 'User enregistré !'}))
      .catch(error => res.status(400).json({ error }));

    })

 
};

exports.connectUser = (req, res, next) => {
  
  User.findOne({ username: req.body.username })
  .then(user => {
    if(!user) {
      return res.status(401).json({ error: 'User not found !' });
    }

    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if(!valid) {
        return res.status(401).json({ error: 'Wrong password !' });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          { userId: user._id },
          'RANDOM_LEVURE_BOULANGERE_SALADE_RADIS_JAKOB_69_LATRIQUE',
          { expiresIn: '24h' }
        )
      })
    })
    .catch(error => res.status(500).json({ error }));
    
  })
  .catch(error => res.status(500).json({ error }));
};

exports.verifUsername = (req, res, next) => {
  
  User.findOne({ username: req.body.username })
  .then(user => {
    if(!user) {
      return res.status(200).json({ status: 'username available'});
    }
    return res.status(200).json({ status: 'username not available' });
    })
  .catch(error => res.status(500).json({ error }));
};