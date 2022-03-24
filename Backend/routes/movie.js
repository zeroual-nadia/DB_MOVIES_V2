//notre logique de routing
//créer un routeur pour ne pas faire app.get ...on fera router.post ...
//notre logique de routing
//créer un routeur pour ne pas faire app.get ...on fera router.post ...
const express = require("express");
const router = express.Router();
//const Thing = require("../model/movie");
module.exports = router;
//importer le middlware de controle token et pour chaque route proteger on l'integre
const auth = require("../middlware/auth");
//on importe le middleware du fichier
const multer = require("../middlware/multter-config");
//importer le controlleur
const stuffctr = require("../controllers/movie");
//enregistrer les routes sur le routeur
//appliquer la fonction a la route pas de ()

/**
 * @swagger
 * /dtbMovie/movie:
 *   post:
 *     summary: creer un nouveau film
 *     tags: [Movie]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               example:
 *                 imageUrl: http://localhost:3000/images/Parasite.jpg
 *                 synopsis: Toute la famille de Ki-taek est au chômage. Elle s’intéresse particulièrement au train de vie de la richissime famille Park. Mais un incident se produit et les deux familles se retrouvent mêlées, sans le savoir, à une bien étrange histoire…
 *                 titre: Parasite (2019)
 *                 acteurs: Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Jung Ji-so...
 *                 userId: 62177d39d0c241cfd3cf1c49
 *               $ref: '#/components/schemas/dtbMovie/movie'
 *     responses:
 *       201:
 *         description: Le film a été ajouté
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/dtbMovie/movie'
 *       400:
 *         description:  Erreur Serveur
 *
 */
router.post("/", auth, multer, stuffctr.createThing);

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *        - titre
 *        - synopsis
 *        - imageUrl
 *        - userId
 *        - acteurs
 *       properties:
 *         id:
 *           type: string
 *           description: l'id du film auto-generated
 *         titre:
 *           type: string
 *           description: le titre du film
 *         synopsis:
 *           type: string
 *           description: la description du film
 *         imageUrl:
 *           type: string
 *           description: l'image du film
 *         userId:
 *           type: string
 *           description: l'utilisateur qui a ajouté le film auto-generated
 *         acteurs:
 *           type: string
 *           description: Les acteurs du flim
 *       example:
 *         id: 6217813a2adfb5e0dbc5dbd3,
 *         imageUrl: http://localhost:3000/images/Parasite.jpg,
 *         synopsis: Toute la famille de Ki-taek est au chômage. Elle s’intéresse particulièrement au train de vie de la richissime famille Park. Mais un incident se produit et les deux familles se retrouvent mêlées, sans le savoir, à une bien étrange histoire…
 *         titre: Parasite (2019),
 *         acteurs: Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Jung Ji-so...
 *         userId: 62177d39d0c241cfd3cf1c49
 */

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Film  API
 */
/**
 * @swagger
 * /dtbMovie/movie:
 *   get:
 *     summary: Returne la liste de tout les films
 *     tags: [Movie]
 *     responses:
 *       400:
 *         description: Error
 *       200:
 *         description: La list des films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 id: 6217813a2adfb5e0dbc5dbd3,
 *                 imageUrl: http://localhost:3000/images/Parasite1645628018955.jpg,
 *                 synopsis: Toute la famille de Ki-taek est au chômage. Elle s’intéresse particulièrement au train de vie de la richissime famille Park. Mais un incident se produit et les deux familles se retrouvent mêlées, sans le savoir, à une bien étrange histoire…
 *                 titre: Parasite (2019),
 *                 acteurs: Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Jung Ji-so...
 *                 userId: 62177d39d0c241cfd3cf1c49
 *               items:
 *                 $ref: '#/components/schemas/dtbMovie/movie'
 */
router.get("/", /* auth,*/ stuffctr.getAllStuff);
/**
 * @swagger
 * /dtbMovie/movie/{id}:
 *   get:
 *     summary: Returne le films avec l'identifiant
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: Le film id
 *     responses:
 *       200:
 *        description: Le film spécifié
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *               id: 6217813a2adfb5e0dbc5dbd3,
 *               imageUrl: http://localhost:3000/images/Parasite.jpg,
 *               synopsis: Toute la famille de Ki-taek est au chômage. Elle s’intéresse particulièrement au train de vie de la richissime famille Park. Mais un incident se produit et les deux familles se retrouvent mêlées, sans le savoir, à une bien étrange histoire…
 *               titre: Parasite (2019),
 *               acteurs: Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Jung Ji-so...
 *               userId: 62177d39d0c241cfd3cf1c49
 *              $ref: '#/components/schemas/dtbMovie/movie'
 *       404:
 *         description: 	Objet Not trouvé !
 */
router.get("/:id", /*auth,*/ multer, stuffctr.getOneThing);

/**
 * @swagger
 * /dtbMovie/movie/{id}:
 *   put:
 *     summary: Modifier le film
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: L'id du film
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               example:
 *                 imageUrl: http://localhost:3000/images/Parasite.jpg
 *                 synopsis: Toute la famille de Ki-taek est au chômage. Elle s’intéresse particulièrement au train de vie de la richissime famille Park. Mais un incident se produit et les deux familles se retrouvent mêlées, sans le savoir, à une bien étrange histoire…
 *                 titre: Parasite (2019)
 *                 acteurs: Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Jung Ji-so...
 *                 userId: 62177d39d0c241cfd3cf1c49
 *               $ref: '#/components/schemas/dtbMovie/movie'
 *     responses:
 *       200:
 *        description: Objet modifier !
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/dtbMovie/movie'
 *       400:
 *         description: Objet non trouvé
 *       401:
 *         description: Unauthorized request!
 *
 */
router.put("/:id", auth, multer, stuffctr.modifyThing);
/**
 * @swagger
 * /dtbMovie/movie/{id}:
 *   delete:
 *     summary: Supprimer le film avec l'id
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: string
 *         required: true
 *         description: L'id du film
 *     responses:
 *       200:
 *        description: Objet supprimé !
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/dtbMovie/movie'
 *       401:
 *         description: Unauthorized request!
 *       404:
 *         description: NoT found
 *       500:
 *         description : Erreur
 */
router.delete("/:id", auth, stuffctr.deleteThing);
module.exports = router;
