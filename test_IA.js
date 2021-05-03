var IA = require("./backend/fonctions_IA.js");
require('@tensorflow/tfjs');
require('@tensorflow-models/universal-sentence-encoder');

const sentence1 = "japan";
const sentence2 = "korea";
const sentence3 = "china";

var embedding1 = [];
var embedding2 = [];
var embedding3 = [];

(async () => {
    //var embeddings = (await IA.text_to_vector([sentence1, sentence2]));
    embedding1 =  (await IA.text_to_vector([sentence2]));

    console.log(embedding1);

})()