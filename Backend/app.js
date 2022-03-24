/*test parti swagger */
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library api",
      version: "1.0.0",
      description: "Documentation DB-MOVIE API ",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
/*tout ce qui est en haut faut le faire avant de definir l'app*/

//fichier pour gerer touutes les requetes envoyer au serveur
const express = require("express"); //importer express
const app = express(); //appel methode express permets de creer une app express
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json()); //elle intercepte tt les requete qui contient du json
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");
const path = require("path"); //nous donne acces a notre systeme de fichier
module.exports = app;
mongoose //connect notre bd
  .connect(
    "mongodb+srv://nadia:nadia@test.feoae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority  ",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
//pour etre connecter a notre frontend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//app.use(bodyParser.json());
app.use("/dtbMovie/movie", movieRoutes);
app.use("/dtbMovie/auth", userRoutes); //la route pour les user
app.use("/images", express.static(path.join(__dirname, "images")));
