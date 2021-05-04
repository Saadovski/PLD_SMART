const IA = require("./fonctions_IA.js");

var movies = [];
for(var i = 0; i < 100; ++i){
  var v1 = new Array(512);
  var v2 = new Array(512);
  var v3 = new Array(512);

  for(var j = 0; j< 512; ++j){
      
      v1[j] = Math.random()*2-1;
      v2[j] = Math.random()*2-1;
      v3[j] = Math.random()*2-1;
  }

  var movie = {
      annee : Math.floor(Math.random()*50) + 1975,
      genreVectors : [v1, v2],
      synopsisVector : v3
  }

  movies.push(movie);
}

var users = [];
for(var i = 0; i < 5; ++i){
  var genreV = new Array(512);
  var synopsisV = new Array(512);
  for(var j = 0; j < 512; ++j){
    genreV[j] = Math.random()*2-1;
    synopsisV[j] = Math.random()*2-1;
  }

  var user = {
    preferences:{
        nbFilms : 10,
        genre: genreV,
        synopsis : synopsisV,
        annee : Math.random()*50 + 1975
    }  
  }
  users.push(user);
}

console.log("création de films et de users finie, appel de l'IA:");
console.log(IA.top_best_movies(movies, users)[0].genreVectors);