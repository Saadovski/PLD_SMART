const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fctIa = require("../fonctions_IA.js")
const Film = require('../models/film');
const User = require('../models/user');
const Preference = require('../models/preference');
const parser = require('mongodb-query-parser');

const tailleEchantillon = 500
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

exports.filmGender = async (req, res, next) => {

    console.log("on requête les films")
    console.log("on passe ici1")
    const listeGenre = req.body.listeGenre
    let requete = ""
    if(listeGenre.length === 0){
            
        listeFilms= []


        Film.aggregate([{ $sample: { size: tailleEchantillon} }])
        .then(films  => {listeFilms = films
        
            return res.status(200).json({ 
                success: "true",
                listFilms: listeFilms
            });}) 
        .catch(error => {console.log("soucis")});
    
    }
    else{
        console.log("on passe ici2")
        requete = "{$or:[";

        for(let genre of listeGenre) {
            requete = requete + "{genre: \"" + genre+ "\"},"
        }
    requete = requete.substring(0, requete.length-1) + "]}";
    


    console.log("requete", requete)
    let query = parser(requete)
    Film.find(query)
        .then(listeFilms => {

            if(listeFilms.length > tailleEchantillon){

                listeFilms = listeFilms.sort(() => Math.random() - 0.5);
                listeFilms = listeFilms.slice(0, tailleEchantillon);
                return res.status(200).json({ 
                    success: "true",
                    listFilms: listeFilms
                });
            } 
            else if(listeFilms.length < tailleEchantillon){
                while(listeFilms.length < tailleEchantillon){
                    Film.aggregate([{ $sample: { size: tailleEchantillon - listeFilms.length } }])
                    .then(films  => {films.forEach(film => {
                        if(listeFilms.indexOf(film) === -1) listeFilms.push(film)
                    })
                }) 
                .catch(error => {console.log("soucis")});
                }
                return res.status(200).json({ 
                    success: "true",
                    listFilms: listeFilms
                });



            }
            else{
                return res.status(200).json({ 
                    success: "true",
                    listFilms: listeFilms
                });  
            }
        
        })





    }


};




exports.updatePreference = async (req, res, next) => {

    Film.findOne({ netflixid: req.body.filmId })
    .then( film => {
        User.findOne({ _id: req.body.userId }).populate('preference')
        .then(user => {

            fctIa.maj_user_preferences(user, film)
            .then(newPreferences =>{

                Preference.updateOne({ _id: user.preference._id }, {$set: 
                    {
                        genre: newPreferences.genre, 
                        annee: newPreferences.annee,
                        nbFilms: newPreferences.nbFilms,
                        synopsis: newPreferences.synopsis
                    }},
                    function(err, resp) {
                        if (err) return res.status(502).json({ success: "false", status: 'Error' });

                        return res.status(200).json({ success: "true", status: 'Preference modified' });
                    });

            });
        })
        .catch(error => console.log(res.status(501).json({ error })));
    })
    .catch(error => res.status(500).json({ error }));

    

    

}




exports.addSession = async (req, res, next) => {
    console.log("coucou")

    User.updateOne({ _id: req.body.userId },{ $inc: { nbSession: 1 } })
    .then(()=>{
        return res.status(200).json({ success: "true", status: 'Session ajoutee' });
    })
    .catch(error => console.log(res.status(501).json({ error })));
}
