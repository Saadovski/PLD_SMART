
exports.Group = class Group {
    constructor(group_id, user) {
        this.group_id = group_id; 
        this.owner = user;
        this.users = [user];
        this.status = "waiting";
        this.list_films = [];
        this.mood = [];
        this.resultatSwipe = {user: 0};
        this.countFilm = {};
        
    }
  
    addUser(username){
      this.users.push(username);
      this.resultatSwipe[username] = 0;
    }
    removeUser(username){
        if(this.users.indexOf(username) !== -1){
            let index = this.users.indexOf(username)
            delete this.users[index]
        }

    }
  

    to_json(){

      return {
        groupId: this.group_id,
        user: this.users, 
        owner: this.owner,
        mood: this.mood,
        films: this.list_films,
      }
    }
  }
