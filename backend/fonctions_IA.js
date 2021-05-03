require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');

module.exports = {
    text_to_vector: function(sentences){
        use.load().then(model => {
            // Embed an array of sentences.
            const sentences = 'Hello';
            model.embed(sentences).then(embeddings => {
              // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
              // So in this example `embeddings` has the shape [2, 512].
              embeddings.print(false);
              const values = embeddings.dataSync();
              const arr = Array.from(values);
              return arr;
            });
          });
    },

    dot: function(a, b) {
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result += a[i] * b[i];
        }
        return result;
    },

    cosine_similarity: function(a, b) {
        var magnitudeA = Math.sqrt(this.dot(a, a));
        var magnitudeB = Math.sqrt(this.dot(b, b));
        if (magnitudeA && magnitudeB)
        return this.dot(a, b) / (magnitudeA * magnitudeB);
        else return false
    },

    user_movie_compatibility: function(user, movie){ //renvoie un score entre un film et un user
        var len = movie.genreVectors.length;
        var score=0;
        for(var i = 0; i < len; ++i){
            score += this.cosine_similarity(user.preferences.genre, movie.genreVectors[i]);
        }
        score = score / len;
        score += this.cosine_similarity(user.preferences.synopsis, movie.synopsisVector);
        score += 1/(Math.abs(user.preferences.annee - movie.annee));
        return result;
    },

    maj_user_preferences: function(user, movie, like){ //l'idee est la le code peut etre adapte a ce qu'on veut faire
        if(like){
            var len = movie.genreVectors.length;
            var nbfilms = user.preferences.nbFilms;

            user.preferences.synopsis = user.preferences.synopsis.map((val, idx) => {//maj synopsis vector
                (val*user.preferences.nbFilms + movie.synopsisVector[idx]) / Math.sqrt(nbfilms + 1)
            });

            var newGenre = user.preferences.genre;
            newGenre = newGenre.map((val) => val * nbfilms * 5);
            for(var i = 0; i < len; ++i){
                newGenre = newGenre.map((val, idx) => val + film.genreVectors[i][idx]);
            }
            newGenre = newGenre.map((val) => val / Math.sqrt(nbfilms * 5 + len));
            user.preferences.genre = newGenre;

            user.preferences.annee = (user.preferences.annee * nbfilms + movie.annee) / (nbfilms + 1);

            user.preferences.nbFilms++;
        }
    }
};