const bcrypt = require("bcrypt"); //le package de chiffrement bcrypt
const jwt = require("jsonwebtoken"); //ce package va nous permettre de creer les TOKEN et les verifier
const { Publication, User, Commentaire } = require("../sequelize");


//la fonction signup:pour l'enregistrement des nv utilisateurs
exports.signup = (req, res, next) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  let errors = [];
  if (!req.body.email) {
    errors.push("l'email est obligatoire");
  }
  if (!emailRegexp.test(req.body.email)) {
    errors.push("le format d'email n'est pas bon");
  }
  if (!req.body.pwd || req.body.pwd.length < 6) {
    errors.push("le mot de passe est obligatoire et il doit dépasser 6 charactères");
  }
  if (!req.body.firstName || !req.body.firstName.trim()) {
    errors.push("Le Prénom est obligatoire");
  }
  if (!req.body.lastName || !req.body.lastName.trim()) {
    errors.push("Le Nom est obligatoire");
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  User.findOne(
    { where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        res.status(400).json({
          errors: ["l'email existe déja"]
        });
        return;
      }
      bcrypt
        .hash(req.body.pwd, 10)
        .then((hash) => {
          User
            .create({
              nom: req.body.lastName,
              prenom: req.body.firstName,
              email: req.body.email,
              image: req.file ? req.file.filename : "static/images/default-avatar.jpeg",
              pwd: hash,

            })
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));

    }).catch((error) => res.status(500).json({ error }));


};
//pour supprimer un compte
exports.deleteUser = (req, res, next) => {
  User.findOne({
    where: { id: req.userId }

  })
    .then(() => {
      Commentaire.destroy({
        where: { userId: req.userId }
      }).then(() => Publication.destroy({
        where: { userId: req.userId }
      }).then(() => User.destroy({
        where: { id: req.userId }
      })
        .then(() => res.status(200).json({ message: "Le compte a été supprimée !" }))
        .catch((error) => res.status(500).json({ error })))
        .catch((error) => res.status(500).json({ error })))
        .catch((error) => res.status(500).json({ error }));

    })
    .catch((error) => res.status(500).json({ error }));
};
///////la fonction login :pour connecter les utilisateur existant
exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.email.trim()) {
    return res.status(401).json({
      error: "Veuillez saisir votre email!"
    });
  }
  User.findOne(
    { where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé !"
        });
      }
      bcrypt
        .compare(req.body.pwd, user.pwd) //la fonction compare de bcrypt permet de comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            imageUrl: user.image,
            nom: user.nom,
            prenom: user.prenom,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
              // nous utilisons la fonction sign de jsonwebtoken pour encoder un nouveau token ;
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
