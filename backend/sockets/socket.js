const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const io = require("socket.io");
const parser = require("mongodb-query-parser");
const connect = require("../dbConnect");
const User = require("../models/user");
const Film = require("../models/film");
const { Group } = require("./group");
const IA = require("../fonctions_IA.js");

const fetch = require("node-fetch");

const Preference = require("../models/preference");
const user = require("../models/user");

var mapGroupIdGroup = {}; // groupId : group
var mapUsernameGroupId = {}; // username: groupeId

exports.init = (server) => {
  const io = require("socket.io")(server, { cors: { origin: "*" } });

  io.sockets.on("connection", (socket) => {
    console.log("Un client est connecté !" + socket.id);

    socket.on("openGroup", async (data) => {
      const User = require("../models/user");

      // on vérifie que les champs nécéssaires sont renseignés

      if (!("auth" in data && "id" in data.auth && "token" in data.auth)) {
        console.log("ça va pas");
      }

      //auth

      verifyUser(data.auth.id, data.auth.token)
        .then((userFromDB) => {
          let user = userFromDB[0];

          console.log("Username", user.username);
          socket.data.user = user;

          // On vérifie que l'utilisateur n'est pas dans un autre groupe.

          if (user.username in mapUsernameGroupId) {
            let oldGroupId = mapUsernameGroupId[user.username];
            if (oldGroupId in mapGroupIdGroup) {
              let tempOldGroup = mapGroupIdGroup[oldGroupId];
              if (tempOldGroup.owner === user.username) {
                let usernameList = tempOldGroup.username;
                usernameList.map((username) => {
                  delete mapUsernameGroupId[username];
                });
              } else {
                mapGroupIdGroup[oldGroupId].removeUser(user);
              }
            }
          }
          // créer un groupe et l'inscrire dans les variables partagées et on le place dans sa propre room

          var groupId = Math.floor(Math.random()*999)

          while(groupId in mapGroupIdGroup){
            groupId =  Math.floor(Math.random()*999);
          }

          let newGroup = new Group(groupId, user);
          mapGroupIdGroup[newGroup.group_id] = newGroup;
          mapUsernameGroupId[user.username] = newGroup.group_id;

          let groupJson = newGroup.to_json();

          console.log("group id ", newGroup.group_id);
          socket.join(newGroup.group_id);

          socket.emit("group", groupJson);
          io.emit("message");
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
      console.log("join group data", data);
      // on vérifie que les champs nécéssaires sont renseignés
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "groupId" in data)) {
        console.log("ça va pas");
      }

      let groupe = mapGroupIdGroup[data.groupId];
      if (groupe) {
        verifyUser(data.auth.id, data.auth.token)
          .then((userFromDB) => {
            let user = userFromDB[0];
            // console.log(userFromDB);
            socket.data.user = user;
            // On vérifie que l'utilisateur n'est pas dans un autre groupe.

            if (mapUsernameGroupId[user.username] && mapGroupIdGroup[mapUsernameGroupId[user.username]]) {
              console.log("in another group");
              let oldGroupId = mapUsernameGroupId[user.username];
              mapGroupIdGroup[oldGroupId].removeUser(user);
            }

            // ajouter l'utilisateur dans son groupe, l'inscrire dans les variables partagées et envoyer le nouveau groupe aux autres membres

            if (groupe.status === "waiting") {
              mapUsernameGroupId[user.username] = groupe.group_id;
              groupe.addUser(user);
              console.log("join group in waiting", groupe);
              socket.join(groupe.group_id);

              // envoyer le contenu du groupe au nouvel utilisateur
              io.in(groupe.group_id).emit("group", groupe.to_json());
              io.emit("test", "salut");
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

        // ajouter l'utilisateur dans son groupe, l'inscrire dans les variables partagées et envoyer le nouveau groupe aux autres membres
      } else {
        socket.emit("error", { message: "ID de session incorrect" });
      }

      //auth
    });

    socket.on("addMood", async (data) => {
      // on vérifie que les champs nécéssaires sont renseignés
      console.log("Add mood function", data);
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "mood" in data && "groupId" in data)) {
        console.log("ça va pas");
      }

      //auth
      let groupe = mapGroupIdGroup[data.groupId];
      if (groupe) {
        verifyUser(data.auth.id, data.auth.token)
          .then((userFromDB) => {
            let user = userFromDB[0];
            //console.log(user);
            console.log("groupe", groupe);

            // On vérifie que l'utilisateur est bien le chef du groupe

            if (groupe.username.find((username) => username === user.username) && groupe.owner === user.username) {
              //on ajoute le mood
              groupe.mood = data.mood;
              console.log("mood :", groupe.mood);

              // on renvoie le groupe à tout le monde
              io.in(data.groupId).emit("group", groupe.to_json());
              io.emit('test', "test");
            } else {
              socket.emit("error", { message: "Vous ne pouvez pas faire ça, vous n'êtes pas le chef du groupe" });
            }
          })
          .catch((error) => {
            console.log("coucou on est dans le catch");
            console.log(error);
            res = {
              success: "false",
              error: "User not found !",
            };
            return res;
          });
      } else {
        socket.emit("error", { message: "ID de session incorrect" });
      }
    });

    socket.on("disconnect", async () => {
      console.log("disconnect");

      if (socket.data.user) {
        const user = socket.data.user;
        console.log("disconnection", user);
        const groupId = mapUsernameGroupId[user.username];
        const group = mapGroupIdGroup[groupId];
        //console.log("group", group);
        // console.log("index", group.username.indexOf(user.username));
        group.users.splice(
          group.users.findIndex((u) => u.username === user.username),
          1
        );
        group.username.splice(group.username.indexOf(user.username), 1);

        if (user.username === group.owner && group.username.length > 0) {
          group.owner = group.users[0].username;
        }

        if (group.users.length < 1) {
          delete mapGroupIdGroup[groupId];
        }

        console.log("new group", group);
        io.in(groupId).emit("group", group.to_json());
      }
    });

    socket.on("ready", async (data) => {
      socket.broadcast.emit("ready", {});
      let start = new Date().getTime();
      // on vérifie que les champs nécéssaires sont renseignés
      console.log(data);
      if (!("auth" in data && "id" in data.auth && "token" in data.auth)) {
        console.log("ça va pas");
      }

      //auth

      //console.log("on va commencer la rq des films2");
      verifyUser(data.auth.id, data.auth.token)
        .then((userFromDB) => {
          //console.log("on va commencer la rq des films3");
          let user = userFromDB[0];

          // On vérifie que l'utilisateur est bien le chef du groupe

          if (user.username in mapUsernameGroupId && mapGroupIdGroup[mapUsernameGroupId[user.username]].owner === user.username) {
            let groupe = mapGroupIdGroup[mapUsernameGroupId[user.username]];

            // on renvoie les films à tout le monde

            //filmsAvantTri = await getFilmsByGender(groupe.mood)

            fetch("http://localhost:1024/api/film/get_film_by_gender", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                listeGenre: groupe.mood,
              }),
            }).then((result) => {
              result
                .json()
                .then((data) => {
                  listeFilms = data.listFilms;
                  //console.log(listeFilms);
                  //console.log(groupe.users);
                  const liste_films_finale = IA.top_best_movies(listeFilms, groupe.users);
                  groupe.list_films = liste_films_finale;

                  groupe.status = "running";

                  // envoyer le contenu du groupe au nouvel utilisateur
                  io.in(mapUsernameGroupId[user.username]).emit("start", groupe.to_json());
                  let end = new Date().getTime();
                  console.log("Time for ready action : ", end - start);
                })
                .catch((error) => console.log(error));
            });
          } else {
            console.log("l'utilisateur n'est pas le chef du groupe");
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
    });

    socket.on("interruptSwipe", async (data) => {
      //on vérifie que l'on a les bons params
      console.log("interrupt_swipe", data);
      if (!("auth" in data && "id" in data.auth && "token" in data.auth)) {
        console.log("ça va pas");
      } else {
        //auth

        verifyUser(data.auth.id, data.auth.token)
          .then((userFromDB) => {
            let user = userFromDB[0];
            console.log(user);
            let groupe = mapGroupIdGroup[mapUsernameGroupId[user.username]];
            groupe.status = "finished";
            console.log(groupe.genClassement());
            io.in(mapUsernameGroupId[user.username]).emit("printRanking", groupe.genClassement());
          })
          .catch((error) => {
            console.log("error", error);
            res = {
              success: "false",
              error: "User not found !",
            };
            return res;
          });
      }
    });

    socket.on("swipe", async (data) => {
      console.log(data);
      if (!("auth" in data && "id" in data.auth && "token" in data.auth && "avis" in data && "filmId" in data)) {
        console.log("ça va pas");
      } else {
        verifyUser(data.auth.id, data.auth.token).then((userFromDB) => {
          let user = userFromDB[0];
          let groupId = mapUsernameGroupId[user.username];
          let groupe = mapGroupIdGroup[groupId];
          let match = groupe.addFilm(data.filmId, user.username, data.avis);

          console.log(groupe.resultatSwipe);
          //console.log(groupe.countFilm)

          if (groupe.isFinish()) {
            console.log("toute la liste a été traitée");
            groupe.status = "finished";
            io.in(mapUsernameGroupId[user.username]).emit("printRanking", mapGroupIdGroup[mapUsernameGroupId[user.username]].genClassement());
          } else if (match === true) {
            console.log("match !");
            io.in(mapUsernameGroupId[user.username]).emit("printMatch", { filmId: data.filmId });
          }
        });
      }
    });
  });
};

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
    return User.find({ _id: id }).populate("preference");
  }
};
