const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const io = require('socket.io')
const parser = require('mongodb-query-parser')
const  connect  = require("../dbConnect");
const User = require('../models/user')
const {Group} = require('./group')

const Preference = require('../models/preference');

var mapGroupIdGroup = {}; // groupId : group
var mapUsernameGroupId = {} // username: groupeId   

exports.init = (server) => {

  const io = require("socket.io")(server, {cors: {origin: "*"}})

  io.sockets.on('connection', (socket)=> {
    
    console.log('Un client est connecté !' + socket.id);




    socket.on("openGroup", async (data) => {
      const User = require('../models/user');
      
      // on vérifie que les champs nécéssaires sont renseignés
      
      if (!("auth" in data && "id" in data.auth && "token" in data.auth)){
        console.log("ça va pas")
      }
      
      //auth

      let auth = await verifyUser(data.auth.id, data.auth.token)

      if( auth.success === "false"){
        console.auth("ça va pas 2")    
      }

      let user = auth.user[0];

      console.log(user.username)

      // On vérifie que l'utilisateur n'est pas dans un autre groupe.
 
      if( user.username in mapUsernameGroupId){
        let oldGroupId = mapUsernameGroupId[user.username]
        let tempGroupe = mapGroupIdGroup[oldGroupId];
        if (tempGroupe.owner === user.username) {
          console.log("suprimation")
        }
        
        mapGroupIdGroup[oldGroupId].removeUser(user.username)
      }

      // créer un groupe et l'inscrire dans les variables partagées et on le place dans sa propre room
      
      var groupId = '_' + Math.random().toString(36).substr(2, 9);

      let newGroup  = new Group(groupId, user.username);
      console.log(groupId)
      mapGroupIdGroup[newGroup.group_id] = newGroup
      mapUsernameGroupId[user.username] = newGroup.group_id

      let groupJson = newGroup.to_json()
      socket.join(newGroup.group_id);
      socket.emit('group', groupJson);

    });

    socket.on("joinGroup", async (data) => {

      // on vérifie que les champs nécéssaires sont renseignés
      console.log(data)
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "groupId" in data)){
        console.log("ça va pas")
      }

            
      //auth

      let auth = await verifyUser(data.auth.id, data.auth.token)

      if( auth.success === "false"){
        console.auth("ça va pas 2")    
      }

      let user = auth.user[0];

      console.log(user.username)



      // On vérifie que l'utilisateur n'est pas dans un autre groupe.
      
      if( user.username in mapUsernameGroupId){
        let oldGroupId = mapUsernameGroupId[user.username]
        mapGroupIdGroup[oldGroupId].removeUser(user.username)
      }

      // ajouter l'utilisateur dans son groupe, l'inscrire dans les variables partagées et envoyer le nouveau groupe aux autres membres

      let groupe = mapGroupIdGroup[data.groupId];
      if (groupe.status === "waiting"){
        mapUsernameGroupId[user.username] = data.groupId;
        groupe.addUser(user.username);
        socket.join(data.groupId);
  
        // envoyer le contenu du groupe au nouvel utilisateur
        socket.emit('group', groupe.to_json())
        socket.broadcast.emit('group', groupe.to_json());

      }
      
    });
    socket.on("addMood", async (data) => {

      // on vérifie que les champs nécéssaires sont renseignés
      console.log(data)
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "groupId" in data && "mood" in data)){
        console.log("ça va pas")
      }
           
      //auth

      let auth = await verifyUser(data.auth.id, data.auth.token)

      if( auth.success === "false"){
        console.auth("ça va pas 2")    
      }

      let user = auth.user[0];

      console.log(user.username)

      // On vérifie que l'utilisateur est bien le chef du groupe


      
      if( user.username in mapUsernameGroupId && mapGroupIdGroup[mapUsernameGroupId[user.username]].owner === user.username){
        let groupe =  mapGroupIdGroup[mapUsernameGroupId[user.username]]
        
        //on ajoute le mood
        groupe.mood = data.mood
      
        // on renvoie le groupe à tout le monde
   
        socket.emit('group', groupe.to_json())
        socket.broadcast.emit('group', groupe.to_json());
      
      }
      else{
        console.log("l'utilisateur n'est pas le chef du groupe")
      }
    });

    socket.on("ready", async (data) => {

      // on vérifie que les champs nécéssaires sont renseignés
      console.log(data)
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "groupId" in data )){
        console.log("ça va pas")
      }
            
      //auth

      let auth = await verifyUser(data.auth.id, data.auth.token)

      if( auth.success === "false"){
        console.auth("ça va pas 2")    
      }

      let user = auth.user[0];

      console.log(user.username)

      // On vérifie que l'utilisateur est bien le chef du groupe

      if( user.username in mapUsernameGroupId && mapGroupIdGroup[mapUsernameGroupId[user.username]].owner === user.username){
        let groupe =  mapGroupIdGroup[mapUsernameGroupId[user.username]]
      
        // on renvoie les films à tout le monde
   
        // a faire 

      }
      else{
        console.log("l'utilisateur n'est pas le chef du groupe")
      }
    });

    socket.on("swipe", async (data) => {

      console.log(data)
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "avis" in data && "filmId" in data )){
        console.log("ça va pas")
      }

      let auth = await verifyUser(data.auth.id, data.auth.token);

      if( auth.success === "false"){
        console.auth("ça va pas 2")    
      } else {
        let user = auth.user[0];
        let groupId = mapUsernameGroupId[user.username];
        let groupe = mapGroupIdGroup[groupId];
        let match = groupe.addFilm(data.filmId, user.username);
        let classement = groupe.genClassement();

        if (match === true) {
          
        }

      }

      
      

      


    });
  });
};


const verifyUser = async (id, token) => {


  const decodedToken = jwt.verify(token, 'RANDOM_LEVURE_BOULANGERE_SALADE_RADIS_JAKOB_69_LATRIQUE');
  const userId = decodedToken.userId;
  let res ;

  if ( id !== userId) {
    res =  {
      "success": "false",
      "error": 'Id not good !'
    }
  } else {
    await User.find({_id: id})
    .then(user => {
      res = {
        "success": "true",
        user,
        "id": userId
      }
    })
    .catch(error => {        
    res = {
      "success": "false",
      "error": 'User not found !'
    }});
  }
  return res


}
