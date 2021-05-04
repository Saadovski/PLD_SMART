const ftcIA = require("../fonctions_IA");
const Preference = require('../models/preference');

exports.Group = class Group {
    constructor(group_id, user) {
        this.group_id = group_id; 
        this.owner = user.username;
        this.users = [user];
        this.username = [user.username];
        this.status = "waiting";
        this.list_films = [];
        this.mood = [];
        this.resultatSwipe = {};
        this.resultatSwipe[user.username] = 0
        this.countFilm = {};
    }
  
    addUser(user){
      this.users.push(user);
      this.resultatSwipe[user.username] = 0;
      this.username.push(user.username)
    }

    removeUser(user){
        if(this.users.indexOf(user) !== -1){
            let index = this.users.indexOf(user)
            delete this.users[index]
            delete this.username[index]
        }
    }

    initFilm(){
      for (let film of list_films) {
        countFilm[film._id] = 0;
      }
    }
  
    isFinish(){
      let res = true
      let count = this.list_films.length
      for (let username of this.username){
        if(this.resultatSwipe[username] !== count-1){
          res = false
        }
      }
      return res
    }
    
    addFilm(filmId, username, avis) {

      if(!(filmId in this.countFilm)){
        this.countFilm[filmId] = 0;
      }
      console.log("je suis passé ici")
      this.resultatSwipe[username]++;
      
      let res = false;

      if(avis){
        this.countFilm[filmId]++;
        if (this.countFilm[filmId] === this.users.length) {
          res = true;
          console.log("Match !");
        }
        return res;
      }
      return false;
      
      

    }


    genClassement() {
      let classement = [];
      let index = 0;
      let nbFilm = 0;
      while (index < this.users.length && nbFilm < 5) {
        for (let film of this.list_films) {
          if(this.countFilm[film._id] === (this.users.length - index)) {
            nbFilm++;
            classement.push(film);
          }
        }
        index++;
      }
      return (classement.slice(4));
    }

    to_json(){

      return {
        groupId: this.group_id,
        users: this.username, 
        owner: this.owner,
        mood: this.mood,
        films: this.clean_films(),
        status: this.status
      }
    }

    clean_films(){
      let liste = []

      for(let film of this.list_films) {
        liste.push(
          {
            "netflixid": film.netflixid, 
            "title": film.title, 
            "synopsis":film.synopsis, 
            "img": film.img,
            "year": film.year,
            "poster": film.poster,
            "genre": film.genre,
            "country": film.country
          })
    }
    return liste
    }


  }
