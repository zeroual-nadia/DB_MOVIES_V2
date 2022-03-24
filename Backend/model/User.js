//pour les utilisateur
const mongoose = require("mongoose");
//npm install mongoose-unique-validator pour ajouter un validateur
const uniqueValidator = require("mongoose-unique-validator"); //pour les adresse mail
//crer notre shemat de données on aura un mail et mdp
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, //unique =true pour ne pas avoir plusieur adreser mail
  password: { type: String, required: true },
});

//on applique unique au shamat comme ca on aura pas 2 users avec la meme adresse mail
userSchema.plugin(uniqueValidator);
//on exporte le shema sous forme de model
module.exports = mongoose.model("User", userSchema);
