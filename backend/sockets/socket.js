const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const io = require("socket.io");
const parser = require("mongodb-query-parser");
const connect = require("../dbConnect");
const User = require("../models/user");
const Film = require("../models/film");
const { Group } = require("./group");

const fetch = require("node-fetch");

const Preference = require("../models/preference");

var mapGroupIdGroup = {}; // groupId : group
var mapUsernameGroupId = {}; // username: groupeId

exports.init = (server) => {
  const io = require("socket.io")(server, { cors: { origin: "*" } });

  io.sockets.on("connection", (socket) => {
    console.log("Un client est connecté !" + socket.id);

    socket.on("openGroup", async (data) => {
      const User = require("../models/user");
      console.log(data);

      // on vérifie que les champs nécéssaires sont renseignés
      
      if (!("auth" in data && "id" in data.auth && "token" in data.auth)) {
        console.log("ça va pas");
      }

      // On vérifie que l'utilisateur n'est pas dans un autre groupe.
 
      if( user.username in mapUsernameGroupId){
        
        let oldGroupId = mapUsernameGroupId[user.username]
        mapGroupIdGroup[oldGroupId].removeUser(user.username)
        let tempGroupe = mapGroupIdGroup[oldGroupId];
        if (tempGroupe.owner === user.username) {
          console.log("suprimation")
        }
      }
      
      //auth

      verifyUser(data.auth.id, data.auth.token)
        .then((userFromDB) => {
          console.log("user", userFromDB);
          let user = userFromDB[0];

          console.log("Username", user.username);

          // On vérifie que l'utilisateur n'est pas dans un autre groupe.

          if (user.username in mapUsernameGroupId) {
            let oldGroupId = mapUsernameGroupId[user.username];
            mapGroupIdGroup[oldGroupId].removeUser(user.username);
          }

          // créer un groupe et l'inscrire dans les variables partagées et on le place dans sa propre room

          var groupId = "_" + Math.random().toString(36).substr(2, 9);

          let newGroup = new Group(groupId, user.username);
          console.log(groupId);
          mapGroupIdGroup[newGroup.group_id] = newGroup;
          mapUsernameGroupId[user.username] = newGroup.group_id;

          let groupJson = newGroup.to_json();
          console.log(groupJson);
          socket.join(newGroup.group_id);
          socket.emit("group", groupJson);
        })
        .catch((error) => {
          console.log(error);
          res = {
            success: "false",
            error: "User not found !",
          };
          return res;
        });
    });
    socket.on("joinGroup", async (data) => {
      // on vérifie que les champs nécéssaires sont renseignés
      console.log(data);
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "groupId" in data)) {
        console.log("ça va pas");
      }

      let groupe = mapGroupIdGroup[data.groupId];
      if (groupe) {
        verifyUser(data.auth.id, data.auth.token)
          .then((userFromDB) => {
            let user = userFromDB[0];
            console.log(userFromDB);
            // On vérifie que l'utilisateur n'est pas dans un autre groupe.

            if (user.username in mapUsernameGroupId) {
              let oldGroupId = mapUsernameGroupId[user.username];
              mapGroupIdGroup[oldGroupId].removeUser(user.username);
            }

            // ajouter l'utilisateur dans son groupe, l'inscrire dans les variables partagées et envoyer le nouveau groupe aux autres membres

            let groupe = mapGroupIdGroup[data.groupId];
            if (groupe.status === "waiting") {
              mapUsernameGroupId[user.username] = data.groupId;
              groupe.addUser(user);
              socket.join(data.groupId);

              // envoyer le contenu du groupe au nouvel utilisateur
              socket.emit("group", groupe.to_json());
              // io.broadcast.emit("group", groupe.to_json());

              io.to(groupe.groupId).emit("group", groupe.to_json());
            }
          })
          .catch((error) => {
            console.log(error);
            res = {
              success: "false",
              error: "User not found !",
            };
            return res;
          });

        if (auth.success === "false") {
          console.auth("ça va pas 2");
        }

        let user = auth.user[0];

        console.log(user.username);

        // On vérifie que l'utilisateur n'est pas dans un autre groupe.

        if (user.username in mapUsernameGroupId) {
          let oldGroupId = mapUsernameGroupId[user.username];
          mapGroupIdGroup[oldGroupId].removeUser(user.username);
        }

        // ajouter l'utilisateur dans son groupe, l'inscrire dans les variables partagées et envoyer le nouveau groupe aux autres membres

        if (groupe.status === "waiting") {
          mapUsernameGroupId[user.username] = data.groupId;
          groupe.addUser(user);
          socket.join(data.groupId);

          // envoyer le contenu du groupe au nouvel utilisateur
          socket.emit("group", groupe.to_json());
          socket.broadcast.emit("group", groupe.to_json());
        }
      } else {
        socket.emit("error", { message: "ID de session incorrect" });
      }

      //auth
    });

    socket.on("addMood", async (data) => {
      // on vérifie que les champs nécéssaires sont renseignés
      console.log(data);
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "mood" in data)) {
        console.log("ça va pas");
      }

      //auth

      let auth = await verifyUser(data.auth.id, data.auth.token);

      if (auth.success === "false") {
        console.auth("ça va pas 2");
      }

      let user = auth.user[0];

      console.log(user.username);

      // On vérifie que l'utilisateur est bien le chef du groupe

      if (user.username in mapUsernameGroupId && mapGroupIdGroup[mapUsernameGroupId[user.username]].owner === user.username) {
        let groupe = mapGroupIdGroup[mapUsernameGroupId[user.username]];

        //on ajoute le mood
        groupe.mood = data.mood;

        // on renvoie le groupe à tout le monde

        socket.join(data.groupId);
        socket.emit("group", groupe.to_json());
        socket.broadcast.emit("group", groupe.to_json());
      } else {
        console.log("l'utilisateur n'est pas le chef du groupe");
      }
    });

    socket.on("ready", async (data) => {
      // on vérifie que les champs nécéssaires sont renseignés
      console.log(data);
      if (!("auth" in data && "id" in data.auth && "token" in data.auth)) {
        console.log("ça va pas");
      }

      //auth

      let auth = await verifyUser(data.auth.id, data.auth.token);

      if (auth.success === "false") {
        console.auth("ça va pas 2");
      }

      let user = auth.user[0];

      console.log(user.username);

      // On vérifie que l'utilisateur est bien le chef du groupe

      if (user.username in mapUsernameGroupId && mapGroupIdGroup[mapUsernameGroupId[user.username]].owner === user.username) {
        let groupe = mapGroupIdGroup[mapUsernameGroupId[user.username]];

        // on renvoie les films à tout le monde

        //filmsAvantTri = await getFilmsByGender(groupe.mood)

        await fetch("http://localhost:1024/api/film/get_film_by_gender", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listeGenre: groupe.mood,
          }),
        }).then(async (result) => {
          data = await result.json();
          console.log(data);
        });


        //console.log(filmsAvantTri)

        // a faire       

      } else {
        console.log("l'utilisateur n'est pas le chef du groupe");
      }
    });

    socket.on("swipe", async (data) => {

      console.log(data)
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "avis" in data && "filmId" in data )){
        console.log("ça va pas")
      }

      verifyUser(data.auth.id, data.auth.token)
      .then(user => {
        let groupId = mapUsernameGroupId[user.username];
        let groupe = mapGroupIdGroup[groupId];
        let match = groupe.addFilm(data.filmId, user.username);
        
        if (match === true) {
          
        }
      })
      .catch((error) => {
        console.log(error);
        res = {
          success: "false",
          error: "User not found !",
        };
        return res;
      });

      if( auth.success === "false"){
        console.auth("ça va pas 2")    
      } else {
        let user = auth.user[0];
        

      }

      
      

      


    });
  })};

const verifyUser = async (id, token) => {
  const decodedToken = jwt.verify(token, "RANDOM_LEVURE_BOULANGERE_SALADE_RADIS_JAKOB_69_LATRIQUE");
  const userId = decodedToken.userId;
  let res;

  if (id !== userId) {
    console.log("id diff de userID", { id, userId });
    res = {
      success: "false",
      error: "Id not good !",
    };
    return res;
  } else {
    return User.find({ _id: id });
  }
};
