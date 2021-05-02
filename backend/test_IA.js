var IA = require("./fonctions_IA.js");
require('@tensorflow/tfjs');
require('@tensorflow-models/universal-sentence-encoder');

sentence1 = "I'm hungry";
sentence2 = "I want food";
sentence3 = "I want a new car";

embedding1 = IA.text_to_vector(sentence1);
embedding2 = IA.text_to_vector(sentence2);
embedding3 = IA.text_to_vector(sentence3);

console.log(embedding1);
console.log(embedding2);
console.log(embedding3);

console.log(sentence1 + " and " + sentence2 + ": " + IA.cosine_similarity(embedding1, embedding2));
console.log(sentence1 + " and " + sentence3 + ": " + IA.cosine_similarity(embedding1, embedding3));
console.log(sentence3 + " and " + sentence2 + ": " + IA.cosine_similarity(embedding3, embedding2));