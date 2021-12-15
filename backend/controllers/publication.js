const Publication = require("../models/publication");
const Commentaire = require("../models/commentaire");
const fs = require("fs");
//creer une publication
exports.createPublication = (req, res, next) => {
  const object1 = JSON.parse(req.body.publication); 
  //convertir le json à  un objet.
  delete object1._id;
  const publication = new Publication({
    ...object,
    commentaire: [],
    imageUrl: `${req.protocol}
      ://${req.get("host")} 
      /images/${req.file.filename}`,
  });

  publication
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//creer un commentaire
exports.createCommentaire = (req, res, next) => {
  const object2 = JSON.parse(req.body.publication.commentaire); //convertir le json à  un objet.

  delete object2._id;
  const commentaire = new Commentaire({
    ...object,
    commentaire: [],
    Text: 0,
  });

  commentaire
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//recuperer toutes les publications
exports.getAllPublications = (req, res, next) => {
    Publication.find()
      .then((publications) => {
        res.status(200).json(publications);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };
  //recuperer une publication
exports.getOnePublication = (req, res, next) => {
    Publication.findOne({
      _id: req.params.id,
    })
      .then((publication) => {
        //si publication trouvé
        res.status(200).json(publication);
      })
      .catch((error) => {
        // si publication no trouvé retourne 404
        res.status(404).json({
          error: error,
        });
      });
  };

//modifier une publication
  exports.modifyPublication = (req, res, next) => {
    const thingObject = req.file
      ? //cet objet regarde si 'req.file' existe ou non .S'il existe, on traite la nouvelle image sinon on traite simplement l'objet entrant
        {
          ...JSON.parse(req.body.publication),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    Publication.updateOne(
      { _id: req.params.id },
      { ...thingObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  };
//supprimer une publication
  exports.deletePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
      .then((publication) => {
        const filename = publication.imageUrl.split("/images/")[1]; // nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
        fs.unlink(`images/${filename}`, () => {
          // la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
          Publication.deleteOne({ _id: req.params.id }) // dans le callback, nous implémentons la logique d'origine, en supprimant la sauce de la base de données.
  
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  };