//logique metier tout ce qui est logique metier c'est a dire les fonction
const Thing = require("../model/movie");
const fs = require("fs"); //operation lier au systeme de fichier

exports.createThing = (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({ ...req.body });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Film enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
  /*const thingObject = JSON.parse(req.body.thing); //si on veut ajouter des images en ligne mais pas pour le moment
  delete thingObject._id;

  const thing = new Thing({
    ...thingObject, //recupe les ségement necessaire ou ce trouve notre image protocol http ou https le host notre serveur(la racine ) et le nom de l'image a la fin
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });*/
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      if (thing.id !== req._id) {
        res.status(200).json(thing);
      }
    })
    .catch((error) => {
      res.status(404).json({
        error: "Objet Not trouvé !",
      });
    });
};
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file //si il existe déja
    ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; // s'il existe pas
  Thing.findOne({ _id: req.params.id }).then((thing) => {
    if (thing.userId !== req.auth.userId) {
      res.status(401).json({
        error: "Unauthorized request!",
      });
    } else {
      Thing.updateOne(
        { _id: req.params.id },
        { ...thingObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then((thing) => {
    if (!thing) {
      res.status(404).json({
        error: new Error("Not found"),
      });
    }
    if (thing.userId !== req.auth.userId) {
      res.status(401).json({
        error: new Error("Unauthorized request!"),
      });
    } else {
      Thing.findOne({ _id: req.params.id })
        .then((thing) => {
          const filename = thing.imageUrl.split("/images/")[1]; // deuxieme elem du tab pour avoir le nom du fichier
          fs.unlink(`images/${filename}`, () => {
            //fonction du package fs pour sup un ficher
            Thing.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Objet supprimé !" }))
              .catch((error) => res.status(400).json({ error }));
          });
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
/*exports.getListMovieUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};*/
/*
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      if (thing.id !== req._id) {
        res.status(200).json(thing);
      } else {
        res.status(401).json({
          error: new Error("Objet Non trouvé !"),
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
*/
