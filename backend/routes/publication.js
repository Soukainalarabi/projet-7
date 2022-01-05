const express = require("express");
const router = express.Router(); //La méthode express.Router():permet de créer des routeurs séparés pour chaque route principale de notre application
const auth = require("../middleware/auth"); //pour proteger nos routes

const pubCtrl = require("../controllers/publication");
const multer = require("../middleware/multer-config");
//si on place le multer avant l'auth tous  les images seront enregister dans le serveur meme les images non authentifiées
router.get("/:id",auth, pubCtrl.getOnePublication);
router.get("/",auth, pubCtrl.getAllPublications);

router.post("/",auth  ,multer, pubCtrl.createPublication);
router.post("/:id/commentaire",auth, pubCtrl.createCommentaire);

router.put("/:id",auth  ,multer, pubCtrl.modifyPublication);
router.put("/:id/commentaire/:idCom", multer, pubCtrl.modifyCommentaire);

router.delete("/:id", auth, multer, pubCtrl.deletePublication);
router.delete(
  "/commentaire/:idCom",auth,
 
  multer,
  pubCtrl.deleteCommentaire
);

module.exports = router;
