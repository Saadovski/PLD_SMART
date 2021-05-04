var IA = require("./fonctions_IA.js");

var genreV = new Array(512);
var synopsisV = new Array(512);
var v1 = new Array(512);
var v2 = new Array(512);
var v3 = new Array(512);
for(var i = 0; i< 512; ++i){
    genreV[i] = Math.random()*2-1;
    synopsisV[i] = Math.random()*2-1;
    v1[i] = Math.random()*2-1;
    v2[i] = Math.random()*2-1;
    v3[i] = Math.random()*2-1;
}

var user = {
    preferences:{
        nbFilms : 10,
        genre: genreV,
        synopsis : synopsisV,
        annee : 2010.54
    }
}


var movie = {
    annee : 2005,
    genreVectors : [v1, v2],
    synopsisVector : v3
}

for(var i = 0; i < 10; ++i){
    console.log(IA.user_movie_compatibility(user, movie));
    console.log(IA.cosine_similarity(user.preferences.synopsis, movie.synopsisVector))
    user.preferences = IA.maj_user_preferences(user, movie, true);
    console.log(user.preferences.annee+"\n\n");
}
