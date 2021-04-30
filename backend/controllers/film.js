const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Film = require('../models/film');


exports.createFilm = (req, res, next) => {

    //il faut transformer "profil" en vecteur
    

    const film_ = new Film({
    ...req.body
    });
    film_.save()
    .then(() => res.status(201).json({ 
    success: "true" ,
    message: 'Film enregistré !'
}))
    .catch(error => res.status(400).json({ error }));

};

exports.filmGender = (req, res, next) => {


    const listFilm = [];
    const longueurListGenre = req.body.listeGenre.length;
    console.log(longueurListGenre)
    //const listeGenre = req.body.listeGenre[1]
    console.log(listeGenre)
    
    return res.status(200).json({ 
        status: 'username available',
        success: "true" });

};
