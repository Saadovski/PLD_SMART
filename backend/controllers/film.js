const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const parser = require('mongodb-query-parser')
const Film = require('../models/film');

const tailleEchantillon = 100
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
    const listeGenre = req.body.listeGenre
    let requete = ""
    if(listeGenre.length === 0){
            
        
        requete = "{}"
    }
    else{
        requete = "{$or:[";

        for(let genre of listeGenre) {
            requete = requete + "{genre: \"" + genre+ "\"},"
        }
    requete = requete.substring(0, requete.length-1) + "]}";
    }

    requete2 = "{"


    for(let genre of listeGenre) {
        requete2 = requete2 + " genre: \""+genre+"\","
    }
    requete2 = requete2.substring(0, requete2.length-1);
    requete2 = requete2 + "}"

    console.log("requete", requete)
    let query = parser(requete)
    Film.find(query)
        .then(listeFilms => {

            if(listeFilms.length > tailleEchantillon){

                listeFilms = listeFilms.sort(() => Math.random() - 0.5);
                listeFilms = listeFilms.slice(0, tailleEchantillon);
                console.log(listeFilms.length)
                return res.status(200).json({ 
                    success: "true",
                    listFilms: listeFilms
                });
            } 
            else if(listeFilms.length < tailleEchantillon){
                while(listeFilms.length < tailleEchantillon){

                    //var random = Math.floor(Math.random() * 2924)                     //Film.findOne({}).skip(random)
                    Film.aggregate([{ $sample: { size: 1 } }])
                    .then( film => {if(listeFilms.indexOf(film) === -1) listeFilms.push(film)})
                    .catch(error => {console.log("soucis")})
                    ; 
                }
                console.log(listeFilms.length)
                return res.status(200).json({ 
                    success: "true",
                    listFilms: listeFilms
                });
            

               
            }
            else{
                console.log(listeFilms.length)
                return res.status(200).json({ 
                    success: "true",
                    listFilms: listeFilms
                });  
            }
            
                
                
            

        
        
        
        
        })


};

