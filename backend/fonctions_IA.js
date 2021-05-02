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
    }
};