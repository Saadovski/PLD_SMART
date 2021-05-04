require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
const similarity = require( 'compute-cosine-similarity' );

module.exports = {
    text_to_vector: async (sentences) => {
         return await use.load().then(async(model) => {
            // Embed an array of sentences.
            return await model.embed(sentences).then(async(embeddings) => {
              // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
              // So in this example `embeddings` has the shape [2, 512].
              const values = embeddings.dataSync();
              const arr = Array.from(values);
              var result = [];
              for(var i = 0; i < sentences.length; ++i){
                  result[i] = arr.slice(i*512, (i+1)*512);
              }
              return result;
            });
          });
    },

    user_movie_compatibility: function(user, movie){ //renvoie un score entre un film et un user
        var len = movie.genreVectors.length;
        var score=0;
        for(var i = 0; i < len; ++i){
            // console.log("user.preference.genre ", user.preference.genre.length)
            // console.log("movie.genreVectors[i] ", movie.genreVectors[i].length)
            // console.log("similarity", { 1: user.preference.genre, 2: movie.genreVectors[i] })
            score += similarity(user.preference.genre, movie.genreVectors[i]);
        }
        score = score / len;
        score += similarity(user.preference.synopsis, movie.synopsisVector);
        if(user.preference.annee - movie.year > 1){
            score += (1/(Math.abs(user.preference.annee - movie.year)))/5;
        }else{//ce if else est pour eviter d'avoir des grandes valeurs
            score += 1/5;
        } //j'ai divisé l'influence de l'année par 5 pour qu'elle ait pas un poids trop fort par rapport au synopsis et les genres
        return score;
    },

    maj_user_preferences: async function(user, movie){ //l'idee est la le code peut etre adapte a ce qu'on veut faire
        var len = movie.genreVectors.length;
        var nbfilms = user.preference.nbFilms;
        var annee = 0;
        var synopsis = [];
        //console.log(user.preference.synopsis);
        synopsis = user.preference.synopsis.map((val, idx) => (val*(nbfilms + 1) + movie.synopsisVector[idx]) / (nbfilms + 1));
        //console.log(synopsis);
        var newGenre = user.preference.genre;
        newGenre = newGenre.map((val) => val * (nbfilms + 1) * 5);
        for(var i = 0; i < len; ++i){
            newGenre = newGenre.map((val, idx) => val + movie.genreVectors[i][idx]);
        }
        newGenre = newGenre.map((val) => val / ((nbfilms + 1) * 5));
        user.preference.genre = newGenre;

        annee = (user.preference.annee * nbfilms + movie.year) / (nbfilms + 1);
        console.log(annee);
        nbfilms = user.preference.nbFilms + 1;

        preference = {
            nbFilms : nbfilms,
            genre: newGenre,
            synopsis : synopsis,
            annee : annee
        }
        return preference;
    },

    top_best_movies: function(movies, users){
        const len = movies.length;
        const nbUsers = users.length;
        const result_length = 50; //nb de films de la liste finale

        for(var m = 0; m < len; ++m){
            movies[m].score = 0;
            for(var u = 0; u < nbUsers; ++u){
                movies[m].score += this.user_movie_compatibility(users[u], movies[m]);
            }
        }

        movies.sort((firstEl, secondEl) => { return secondEl.score - firstEl.score} ); // on classe par rapport au score 
        for(var i = 0; i < result_length; ++i){
            delete movies[i].score // on enleve la propriété score
        }
        return movies.slice(0, result_length); //on renvoit la liste finale
    }
};