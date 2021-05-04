const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fctIa = require("../fonctions_IA.js")
const Film = require('../models/film');
const User = require('../models/user');
const Preference = require('../models/preference');
const parser = require('mongodb-query-parser');

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
                // while(listeFilms.length < tailleEchantillon){

                //     //var random = Math.floor(Math.random() * 2924)                     //Film.findOne({}).skip(random)
                //     Film.aggregate([{ $sample: { size: 1 } }])
                //     .then( film => {if(listeFilms.indexOf(film) === -1) listeFilms.push(film)})
                //     .catch(error => {console.log("soucis")})
                //     ; 
                // }
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

exports.updatePreference = async (req, res, next) => {

    Film.findOne({ _id: req.body.filmId })
    .then( film => {
        User.findOne({ _id: req.body.userId }).populate('preference')
        .then(user => {
            console.log(user);
            let newPreferences = await(fctIa.maj_user_preferences(user, film));
            console.log(newPreferences);
            console.log("Pain")
            Preference.updateOne({ _id: user.preference._id }, {$set: 
            {
                genre: newPreferences.genre, 
                annee: newPreferences.annee,
                nbFilms: newPreferences.nbFilms,
                synopsis: newPreferences.synopsis
            }},
            function(err, resp) {
                if (err) return res.status(502).json({ success: "false", status: 'Error' });
                console.log("1 document updated");
                return res.status(200).json({ success: "true", status: 'Preference modified' });
            });
        })
        .catch(error => console.log(res.status(501).json({ error })));
    })
    .catch(error => res.status(500).json({ error }));

    

    

}

// exports.filmGender = (req, res, next) => {


//     let listFilm = [];
//     const longueurListGenre = req.body.listeGenre.length;
//     console.log(longueurListGenre);
//     const listeGenre = req.body.listeGenre
//     console.log(listeGenre);
    
//     if(longueurListGenre === 0){
            
        
//         return res.status(200).json({ 
//                 success: "true",
//                 listFilms: []
//             });
//     }

//     let requete = "{$or:[";

//     for(let genre of listeGenre) {
//         requete = requete + "{\"genre\": {$regex : \".*" + genre+ ".*\"}},"
//     }

//     requete = requete.substring(0, requete.length-1) + "]}";
//     console.log(requete)
//     Film.find(parser(requete))
//     .then(listeFilms => {
//         console.log("liste récupérée")
//         if(listeFilms.length > 250){

//             listeFilms = listeFilms.sort(() => Math.random() - 0.5);
//             listeFilms = listeFilms.slice(0, 249);
//             console.log("liste raccourcie")
//             console.log(listeFilms.length)
//             return res.status(200).json({ 
//                 success: "true",
//                 listFilms: listeFilms
//             });
//         } 
//          else{
            
//             Film.count()
//             .then(nbFilms =>{
//                 while(listeFilms.length < 250){
//                     console.log(nbFilms);
                    
//                     Film.findOne({"genre": "Comedy"})
//                     .then( film =>
//                         console.log("a")
//                     )
//                     .catch(error => console.log("error"))
                
//                 }
//                 return res.status(200).json({ 
//                     success: "true",
//                     listFilms: listeFilms
//                 });
//             })
//             console.log("liste allongée")
//             console.log(listeFilms.length)
//         }
        


//     })        
//     .catch(error =>  res.status(500).json({ error }))



// };
