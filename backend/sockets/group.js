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
        this.filmSwiped = [];
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
        this.filmSwiped.push({filmId: filmId, title: (this.list_films.find(film => film.netflixid === filmId)).title, count: 0});
        console.log(this.filmSwiped);
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
      
      this.filmSwiped = this.filmSwiped.map(film => {
        film.count = this.countFilm[film.filmId];
        return film
      }); 
      
      let newClassement = this.filmSwiped.sort((a,b)=>{return b.count - a.count});

      console.log(this.status);
      console.log(newClassement.slice(0,5))
      return (newClassement.slice(0,5));
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
