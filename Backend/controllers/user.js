//on install bcrypt qui permet de hasher les mdp c'est une methode non reversible trés sécure
//npm install --save bcrypt
const bcrypt = require("bcrypt");
const User = require("../model/User"); // importer le model bien sur
//const ser = require("../model/User");
//npm install jsonwebtoken package pour crer des token et les verifier
const jwt = require("jsonwebtoken");

//enregistrement d'un nex user
//on hash avec hash(...) avec 10 tour methode asynchrone on doit mettre un catch puis on ajoute
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//connect un utilisateur
//la fonction compare de bcrypt qui compare les mdp
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(402).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              //c'est la fonction de jsonwebtoken
              expiresIn: "24h", //expiration d'un token
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUser = (req, res, next) => {
  User.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
