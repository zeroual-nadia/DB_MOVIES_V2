const jwt = require("jsonwebtoken");
//pour chaque route proteger faut passer par ce middelware avant
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //recup le token  on recup le deuxiee elem du tableau donc le token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId; //on ledecode  donc ca sera un objet json
    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
