const mongoose = require("mongoose");
//fonction shema du package on lui passe un objet

const movieSchema = mongoose.Schema({
  titre: { type: String, required: true }, //true sans lui on ne va pas enregistrer l'objet
  synopsis: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  acteurs: { type: String, required: true },
});

//pour exporter le model
module.exports = mongoose.model("movie", movieSchema);
