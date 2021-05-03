const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const group = require('./group');


var usersSocketId = {}; // user: socketId

var usersGroup = {} // userId: groupeId   
var listGroupe = []; // groupeId 
var groupeComposition = {}; // groupeId : [userID]
var groupeMaster = {}; // groupeId: userId 

exports.socketConnection = (socket) => {


  console.log('Un client est connecté !' + socket.id);


  socket.on("openGroup", (data) => {
    console.log(data);
    // on vérifie que les champs nécéssaires sont renseignés
    

      
    //auth


    //récuperer les coordonnées de l'utilisateur

    usersSocketId[data.id] = socket.id
    // On vérifie que l'utilisateur n'est pas dans un autre groupe.

    if(usersGroup.hasOwnProperty(data.id)){
      oldGroupId = usersGroup[data.id]
      if(groupeMaster[oldGroupId] === data.id){
        delete groupeMaster[oldGroupId]
        delete groupeComposition[oldGroupId]
      }  
      else{
        groupeComposition[oldGroupId].remove(data.id)
      }
    }
    // créer un groupe et l'inscrire dans les variables partagées
    var id = '_' + Math.random().toString(36).substr(2, 9);
    listGroupe.push(id);
    groupeMaster[id] = data.id
    groupeComposition[id] = [data.id]
    console.log("id : " + id)
    console.log("groupeMaster : " + groupeMaster[id])
    console.log("groupeComposition : " + groupeComposition[id])
  });

  socket.on("joinGroup", (data) => {
    console.log(data);
    //auth


    //récuperer les coordonnées de l'utilisateur

    usersSocketId[data.id] = socket.id
    // On vérifie que l'utilisateur n'est pas dans un autre groupe.

    if(usersGroup.hasOwnProperty(data.id)){
      oldGroupId = usersGroup[data.id]
      if(groupeMaster[oldGroupId] === data.id){
        delete groupeMaster[oldGroupId]
        delete groupeComposition[oldGroupId]
      }  
      else{
        groupeComposition[oldGroupId].remove(data.id)
      }
    }
    // ajouter l'utilisateur dans son groupe et l'inscrire dans les variables partagées

    groupeComposition[data.groupId].push(data.id)
    console.log("id : " + data.groupId)
    console.log("groupeMaster : " + groupeMaster[data.groupId])
    console.log("groupeComposition : " + groupeComposition[data.groupId])

    // envoyer le contenu du groupe au nouvel utilisateur

    socket.emit('group', groupeComposition[data.groupId])
  });
};






// };
