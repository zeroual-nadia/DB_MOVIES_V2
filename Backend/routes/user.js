const express = require("express");
const router = express.Router();
//const multer = require("../middlware/multter-config");
const userCtrl = require("../controllers/user"); //tjr le controlleur
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe
 *       example:
 *         email: zeroualna@gmail.com
 *         password: $2b$10$AXlzfKygsklU5bdQwaYIv.Yix3Kq.OZFrKaRO4r/gUJPQ4AeWd1JS
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users  API
 */
/**
 * @swagger
 * /dtbMovie/auth/signup:
 *   post:
 *     summary: s'inscrire
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               example:
 *                 email: zeroualna@gmail.com
 *                 password: $2b$10$AXlzfKygsklU5bdQwaYIv.Yix3Kq.OZFrKaRO4r/gUJPQ4AeWd1JS
 *               $ref: '#/components/schemas/dtbMovie/auth'
 *     responses:
 *       201:
 *         description: Utilisateur créé !
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/dtbMovie/auth'
 *       400:
 *         description:  Erreur utilisateurs
 *       500:
 *         description: Erreur Server
 *
 */
router.post("/signup", userCtrl.signup);
/**
 * @swagger
 * /dtbMovie/auth/login:
 *   post:
 *     summary: se connecter
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               example:
 *                 email: zeroualna@gmail.com
 *                 password: $2b$10$AXlzfKygsklU5bdQwaYIv.Yix3Kq.OZFrKaRO4r/gUJPQ4AeWd1JS
 *               $ref: '#/components/schemas/dtbMovie/auth'
 *     responses:
 *       401:
 *         description: Utilisateur non trouvé !
 *       402:
 *         description:  Erreur Mot de passe incorrect !
 *       500:
 *         description: Erreur Server !
 *       200:
 *         description : Utilisateur Connecter ! Token expire dans 24H
 *
 */
router.post("/login", userCtrl.login);

/*//test route logout
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "You have logged out");
  res.redirect("/");
});*/
//router.post("/logout", userCtrl.login);
module.exports = router;
