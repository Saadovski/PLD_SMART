const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const parser = require('mongodb-query-parser')
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
        requete = requete + "{\"genre\": {$regex : \".*" + genre+ ".*\"}},"
    }

    requete = requete.substring(0, requete.length-1) + "]}";
    console.log(requete)
    Film.find(parser(requete))
    .then(listeFilms => {
        console.log("liste récupérée")
        if(listeFilms.length > 250){

            listeFilms = listeFilms.sort(() => Math.random() - 0.5);
            listeFilms = listeFilms.slice(0, 249);
            console.log("liste raccourcie")
            console.log(listeFilms.length)
        } 
        // else{
        //     while(listeFilms.length < 250){
        //         console.log("1");
        //         Film.aggregate.prototype.sample(1)
        //         .then( film => {
        //             console.log("ta mere");
        //             if(listeFilms.indexOf(film) === -1) listeFilms.push(film); 
        //         })
        //         .catch(error => res.status(400).json({ error }));

               
        //     }
        //     console.log("liste allongée")
        //     console.log(listeFilms.length)
        // }
        
        return res.status(200).json({ 
            success: "true",
            listFilms: listeFilms
        });

    })        
    .catch(error =>  res.status(400).json({ error }))



};
