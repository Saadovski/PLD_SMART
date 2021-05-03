
exports.Group = class Group {
    constructor(group_id, user) {
        this.group_id = group_id; 
        this.owner = user;
        this.users = [user];
        this.status = "waiting";
        this.list_films = [];
        this.mood =[];


        // {
        //     user1: 34,
        //     user2: 35
        // }

        // {
        //      filmid1: 2,
        //      filmid2: 3,
        //      filmid3: 10,
        // }
        
    }
  
    addUser(username){
      this.users.push(username)
    }
    removeUser(username){
        if(this.users.indexOf(username) !== -1){
            let index = this.users.indexOf(username)
            delete this.users[index]
        }

    }
  

    to_json(){

      return {
        groupeId: this.group_id,
        user: this.users, 
        owner: this.owner,
        mood: this.mood,
        films: this.list_films
      }
    }
  }
