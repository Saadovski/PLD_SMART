const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fctIa = require("../fonctions_IA.js")
const Film = require('../models/user');
const User = require('../models/user');
const Genre = require('../models/genre');
const Preference = require('../models/preference');
const parser = require('mongodb-query-parser');

exports.createUser = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {

      //il faut transformer "profil" en vecteur
      
    
        if(req.body.profil.length === 0){
          requete = "{}";
        } else{
          requete = "{$or:[";

          for(let genre of req.body.profil) {
              requete = requete + "{genre: \"" + genre+ "\"},"
          }
          requete = requete.substring(0, requete.length-1) + "]}";  
        }

        console.log("requete", requete)


        let query = parser(requete)
        
        Genre.find(query)
        .then(list_genre =>{
          console.log("genre_verctor : ",list_genre)
          
          let genre_vectors = []
          for (let gr of list_genre){
            genre_vectors.push(gr.vector)
          }
          let arrayGenre = new Array(512).fill(0);

          for (var i = 0; i < genre_vectors.length; ++i) {
            arrayGenre = arrayGenre.map((val, idx)=> val + genre_vectors[i][idx]);
          }
          arrayGenre = arrayGenre.map((val)=> val / genre_vectors.length);
          //console.log(arrayGenre)
          console.log("voici ce que l'on va insérer dans la bdd", arrayGenre)
          const preference_ = new Preference({
            genre: arrayGenre,
            synopsis : arrayGenre,
            nbFilms: 0,
            annee: 0
          });
          preference_.save()
            .then(() => {

              const user = new User({
                username: req.body.username,
                password: hash,
                nbSession: 0,
                preference: preference_
              });

              user.save()
                .then(() => res.status(200).json({
                  success: true,
                  reponse: "User enregistré et connecté",
                  userId: user._id,
                  token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_LEVURE_BOULANGERE_SALADE_RADIS_JAKOB_69_LATRIQUE',
                    { expiresIn: '24h' }
                  )
                }))
                .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(401).json({ error }));
        })
    })
};

exports.connectUser = (req, res, next) => {

  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'User not found !',
          success: false
        });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(402).json({
              error: 'Wrong password !',
              success: false
            });
          }
          res.status(200).json({
            success: true,
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
      if (!user) {
        return res.status(200).json({
          status: 'username available',
          success: true
        });
      }
      return res.status(200).json({
        status: 'username not available',
        success: false
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.unsubscribe = (req, res, next) => {

  console.log(req.body.userId)
  User.deleteOne({ _id: req.body.userId })
    .then(() => res.status(200).json({
      message: 'Objet supprimé !',
      success: true
    }))
    .catch(error => res.status(400).json({
      error,
      success: false
    }));

};

exports.checkInfoUser = (req, res, next) => {

  Film
  let newPreferences = ftcIA.maj_user_preferences(user, film);
  User.findOne({ _id: req.body.userId }).populate('preference')
    .then(user => {
      if (!user) {
        return res.status(200).json({ success: false, status: 'username not available' });
      }
      return res.status(200).json({
        status: 'stats found',
        success: true,
        nb_sessions: user.nbSession,
        nb_films: user.preference.nbFilms
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifMdp = (req, res, next) => {
 
bcrypt.hash(req.body.password, 10)
.then(hash => {
  User.updateOne({ _id: req.body.userId }, {$set: {password: hash}},function(err, resp) {
    if (err) return res.status(500).json({ success: false, status: 'Error' });
    console.log("1 document updated");
    return res.status(200).json({ success: true, status: 'Password modified' });
  });
})
}