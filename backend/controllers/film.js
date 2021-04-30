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


    let listFilm = [];
    const longueurListGenre = req.body.listeGenre.length;
    console.log(longueurListGenre);
    const listeGenre = req.body.listeGenre
    console.log(listeGenre);
    

    let requete = "{$or:[";

    for(let genre of listeGenre) {
        requete = requete + "{\"genre\": {$regex : \".*" + genre+ ".*\"}},"}

    requete = requete + "]}";

    // Film.find(requete)
    // .then(listeFilms => {
    //     console.log(listeFilms);
    // })        
    // utiliser json.parse ? 
    console.log(requete);

    return res.status(200).json({ 
        status: 'username available',
        success: "true" });

};
