const ftcIA = require("../fonctions_IA");
const Preference = require('../models/preference');

exports.Group = class Group {
    constructor(group_id, user) {
        this.group_id = group_id; 
        this.owner = user;
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
    
    removeUser(username){
        if(this.users.indexOf(username) !== -1){
            let index = this.users.indexOf(username)
            delete this.users[index]
        }

    }

    initFilm(){
      for (let film of list_films) {
        countFilm[film._id] = 0;
      }
    }
  
    addFilm(filmId, username) {
      this.resultatSwipe[username]++;
      this.countFilm[filmId]++;
      res = false;
      if (countFilm === this.users.length) {
        res = true;
        console.log("Match !");
      }
      return res;
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
        films: this.list_films,
      }
    }
  }
