const express = require("express");
const router = express.Router(); //La méthode express.Router():permet de créer des routeurs séparés pour chaque route principale de notre application
const auth = require("../middleware/auth"); //pour proteger nos routes

const stuffCtrl = require("../controllers/publication");
const multer = require("../middleware/multer-config");
//si on place le multer avant l'auth tous  les images seront enregister dans le serveur meme les images non authentifiées
router.get("/:id", auth, stuffCtrl.getOnePublication);
router.get("/", auth, stuffCtrl.getAllPublications);

router.post("/", auth, multer, stuffCtrl.createPublication);
router.post("/:id/commentaire", auth, stuffCtrl.createCommentaire);

router.put("/:id", auth, multer, stuffCtrl.modifyPublication);
router.put(
  "/:id/commentaire/:idComm",
  auth,
  multer,
  stuffCtrl.modifyCommentaire
);

router.delete("/:id", auth, multer, stuffCtrl.deletePublication);
router.delete(
  "/:id/commentaire/:idComm",
  auth,
  multer,
  stuffCtrl.deleteCommentaire
);

module.exports = router;
