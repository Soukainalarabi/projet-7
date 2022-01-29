const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};
//storage: contient la logique nécessaire qui indique à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //la fonction "destination": indique à multer d'enregistrer les fichiers dans le dossier images
    callback(null, "images");
  },
  //la fonction "filename": indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];//pour résoudre l'extension de fichier appropriée.
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");// multer va gérer uniquement les téléchargements de fichiers image.
