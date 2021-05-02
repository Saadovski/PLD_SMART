const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");

const userRoute = require('./routes/user');
const filmRoute = require('./routes/film');

mongoose.connect('mongodb://pldsmart:pldsmart@146.59.236.173:27017/DB_WALOU?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// mongoose.connect('mongodb://pldsmart:pldsmart@146.59.236.173:27017/DB_WALOU', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     autoIndex: true,
// }).then(() => console.log("test"));

app.use(express.json());
app.use(cors());
app.use('/api/user', userRoute);
app.use('/api/film', filmRoute);

module.exports = app;

