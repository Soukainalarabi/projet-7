const {Publication} = require("../sequelize");
const { Commentaire } = require("../sequelize");
const fs = require("fs");

////////creer une publication
exports.createPublication = (req, res, next) => {
  Publication.create ({
    image: `${req.protocol}
      ://${req.get("host")} 
      /images/${req.file.filename}`,
    text: req.body.text
  }
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    }))
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//////creer un commentaire
exports.createCommentaire = (req, res, next) => {
Commentaire.create ({
    text: req.body.text
  }
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    }))
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//recuperer toutes les publications
exports.getAllPublications = (req, res, next) => {
    Publication.findAll()
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
       where: { id: req.body.id }
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
    Publication.findOne({
      where: { id: req.body.id }})
     .then((publication) => {
        Publication.update({
        image: `${req.protocol}
          ://${req.get("host")} 
          /images/${req.file.filename}`,
        text: req.body.text},
        { where:{
        id: req.param.id
      }
      .then(() => res.status(200).json({ message: "Objet supprimé !" }))
      .catch((error) => res.status(400).json({ error }))
  });
})
  .catch((error) => res.status(500).json({ error }));
};
  //////modifier un commentaire
  exports.modifyCommentaire = (req, res, next) => {
    Commentaire.findOne({
      where: { id: req.params.idCom }})
     .then((publication) => {
    Commentaire.update({
        text: req.body.text},{
          where:{
        id: req.param.idCom
      }
    })
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }));
  };
//////supprimer une publication
  exports.deletePublication = (req, res, next) => {
    Publication.destroy({ 
      where:{id: req.params.id }})  
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
  };
  //supprimer un commentaire
  exports.deleteCommentaire = (req, res, next) => {
    Commentaire.destroy({ 
      where:{id: req.params.idCom }})  
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
  };