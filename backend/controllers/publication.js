const { Publication, User, Commentaire, USER_ALIAS } = require("../sequelize");
const fs = require("fs");
const publication = require("../models/publication");
const { mapPublication, mapPublications } = require("./publication-mapping")

////////creer une publication
exports.createPublication = (req, res, next) => {
  let publicationToCreate = {
    text: req.body.text,
    title: req.body.title,
    image: req.body.image,

    userId: req.userId

  };
  if (req.file) {
    publicationToCreate.image = `images/${req.file.filename}`;
  }
  Publication.create(publicationToCreate)
    .then((publication) => {
      res.status(201).json({
        message: "La publication est crée",
        idPublication: publication.id,
        image: publication.image,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
//////creer un commentaire
exports.createCommentaire = (req, res, next) => {
  /////Si un commentaire est vide ou contient des espaces il ne sera pas envoyer
  if (!req.body.text || !req.body.text.trim()) {
    res.status(400).json({ message: "le commentaire ne devrait pas être vide" });
    return;
  }
  Commentaire.create({
    text: req.body.text,
    idPublication: req.params.id,
    userId: req.userId
  })
    .then((com) => {
      res.status(200).json({
        message: "Le commentaire est crée",
        idCommentaire: com.id
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
//recuperer toutes les publications
exports.getAllPublications = (req, res, next) => {
  Publication.findAll({
    ///on va récupérer les publication par ordre décroissant selon la date de leur création
    order: [["createdAt", "DESC"]],
    include: [{ model: User, as: USER_ALIAS },
    {
      model: Commentaire, as: "commentaires",
      include: { model: User, as: USER_ALIAS }
    }]
  })
    .then((publications) => {
      res.status(200).json(mapPublications(publications));
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
//récupérer une publication
exports.getOnePublication = (req, res, next) => {
  Publication.findOne(
    {
      where: { id: req.params.id },
      include: [{ model: User, as: USER_ALIAS },
      {
        model: Commentaire, as: "commentaires",
        include: { model: User, as: USER_ALIAS }
      }]
    })
    .then((publication) => {
      console.log(publication);
      res.status(200).json(mapPublication(publication));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

//modifier une publication
exports.modifyPublication = (req, res, next) => {

  Publication.findOne(
    {
      where: { id: req.params.id },
      include: [{ model: User, as: USER_ALIAS },
      {
        model: Commentaire, as: "commentaires",
        include: { model: User, as: USER_ALIAS, }
      }]

    })

    .then((publication) => {

      //Autoriser la modification uniquement à l'utilisateur qui l'a crée.

      if (publication.user.id != req.userId) {
        res.status(401).json({ message: "La modification de la publication n'est pas autorisée" });
        return;
      }
      if (!req.body.title || !req.body.title.trim()) {
        res.status(400).json({ message: "le titre ne devrait pas être vide" });
        return;
      }
      if (!req.body.text || !req.body.text.trim()) {
        res.status(400).json({ message: "le texte ne devrait pas être vide" });
        return;
      }
      let publicationToUpdate = {
        text: req.body.text,
        title: req.body.title

      };
      if (req.file) {
        publicationToUpdate.image = `images/${req.file.filename}`;
      }
      Publication.update(publicationToUpdate,
        {
          where: {
            id: req.params.id
          }
        })
        .then(() => res.status(200).json({
          message: "La publication est modifiée",
          //on retourne l'image de la publication qu'on a modifié si elle est saisi sinon on récupère l'ancienne image stockée dans la base des données
          image: publicationToUpdate.image ? publicationToUpdate.image : publication.image
        }))
        .catch((error) => res.status(500).json({ error }));

    })
    .catch((error) => res.status(500).json({ error }));
};
//////modifier un commentaire
exports.modifyCommentaire = (req, res, next) => {
  if (!req.body.text || !req.body.text.trim()) {
    res.status(400).json({ message: "Le commentaire ne devrait pas être vide" });
    return;
  }
  Commentaire.findOne({
    where: { id: req.params.idCom },
    include: { model: User, as: USER_ALIAS, }

  })
    .then((commentaire) => {
      if (commentaire.user.id != req.userId) {
        res.status(401).json({ message: "La modification du commentaire n'est pas autorisée" });
        return;
      }

      Commentaire.update({
        text: req.body.text
      }, {
        where: {
          id: req.params.idCom
        }
      })
        .then(() => res.status(200).json({ message: "Le commentaire a été modifié !" }))
        .catch((error) => res.status(500).json({ error: error.message }))
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
//////supprimer une publication
exports.deletePublication = (req, res, next) => {
  Publication.findOne({
    where: { id: req.params.id },
    include: { model: User, as: USER_ALIAS, }

  })
    .then((publication) => {
      if (publication.user.id != req.userId) {
        res.status(401).json({ message: "La suppression de la publication n'est pas autorisée" });
        return;
      }
      Publication.destroy({
        where: { id: req.params.id }
      })
        .then(() => res.status(200).json({ message: "La publication a été supprimée !" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//supprimer un commentaire
exports.deleteCommentaire = (req, res, next) => {
  Commentaire.findOne({
    where: { id: req.params.idCom },
    include: { model: User, as: USER_ALIAS, }

  })
    .then((commentaire) => {
      if (commentaire.user.id != req.userId) {
        res.status(401).json({ message: "La suppression du commentaire n'est pas autorisée" });
        return;
      }
      Commentaire.destroy({
        where: { id: req.params.idCom }
      })
        .then(() => res.status(200).json({ message: "Le commentaire a été supprimé !" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};