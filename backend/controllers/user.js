const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fctIa = require("../fonctions_IA.js")

const User = require('../models/user');
const Preference = require('../models/preference');

exports.createUser = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {

      //il faut transformer "profil" en vecteur
      let arrayGenre;
      (async () => {
        arrayGenre = (await fctIa.text_to_vector(req.body.profil))
      
        console.log(arrayGenre)

        const preference_ = new Preference({

          genre: arrayGenre,
          nbFilms: 0
        });
        preference_.save()
        .then( () =>{
  
          const user = new User({
            username: req.body.username,
            password: hash,
            nbSession: 0,
            preference: preference_
            });
      
            user.save()
            .then(() =>  res.status(200).json({
              success: "true" ,
              reponse: "User enregistré et connecté",
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_LEVURE_BOULANGERE_SALADE_RADIS_JAKOB_69_LATRIQUE',
                { expiresIn: '24h' }
              )
            }))
            .catch(error =>  res.status(400).json({ error }));
      
          })
        .catch(error =>  res.status(400).json({ error }));
  

      })()


    })

 
};

exports.connectUser = (req, res, next) => {
  
  User.findOne({ username: req.body.username })
  .then(user => {
    if(!user) {
      return res.status(401).json({ 
        error: 'User not found !',
        success: "false"  });
    }

    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if(!valid) {
        return res.status(401).json({ 
          error: 'Wrong password !',
          success: "false"  });
      }
      res.status(200).json({
        success: "true",
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
      return res.status(200).json({ 
      status: 'username available',
      success: "true" });
    }
    return res.status(200).json({
      status: 'username not available',
      success: "false" 
    });
    })
  .catch(error => res.status(500).json({ error }));
};

exports.unsubscribe = (req, res, next) => {
  
  console.log(req.body.userId)
  User.deleteOne({ _id: req.body.userId })
  .then(() => res.status(200).json({ 
    message: 'Objet supprimé !',
    success: "true" 
}))
  .catch(error => res.status(400).json({ 
    error ,
    success: "false" 
  }));
  
};

exports.checkInfoUser = (req, res, next) => {
  
  User.findOne({ _id: req.body.userId }).populate('preference')
  .then(user => {
    if(!user) {
      return res.status(200).json({ success: "false", status: 'username not available' });
    }
    return res.status(200).json({ 
      status: 'stats found',
      success: "true",
      nb_sessions: user.nbSession,
      nb_films: user.preference.nbFilms
    });
    })
  .catch(error => res.status(500).json({ error }));
};