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

    const listeGenre = req.body.listeGenre
    let requete = ""
    if(listeGenre.length === 0){
            
        
        requete = "{}"
    }
    else{
        requete = "{$or:[";

        for(let genre of listeGenre) {
            requete = requete + "{\"genre\": {$regex : \".*" + genre+ ".*\"}},"
        }
    requete = requete.substring(0, requete.length-1) + "]}";
    }


    Film.find(parser(requete))
        .then(listeFilms => {

            if(listeFilms.length > 250){

                listeFilms = listeFilms.sort(() => Math.random() - 0.5);
                listeFilms = listeFilms.slice(0, 250);
                console.log(listeFilms.length)
                return res.status(200).json({ 
                    success: "true",
                    listFilms: listeFilms
                });
            } 
            else if(listeFilms.length < 250){
                tout_films = Film.find()
                .then(tout_films =>{
                    nb_films = tout_films.length
                    while(listeFilms.length < 250){
    
                        var random = Math.floor(Math.random() * nb_films)
                        film = tout_films[random]
                        if(listeFilms.indexOf(film) === -1) listeFilms.push(film); 
                    }
                    console.log(listeFilms.length)
                    return res.status(200).json({ 
                        success: "true",
                        listFilms: listeFilms
                    });
                })
                .catch(error => res.status(400).json({ error }))

               
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
