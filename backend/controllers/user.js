const bcrypt = require("bcrypt"); //le package de chiffrement bcrypt
const jwt = require("jsonwebtoken"); //ce package va nous permettre de creer les TOKEN et les verifier
const { User } = require("../sequelize");

//la fonction signup:pour l'enregistrement des nv utilisateurs
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User
        .create({
          nom:"ay",
          prenom:"era",
          email:req.body.email,
          pwd: hash
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(501).json({ error }));
};
//la fonction login :pour connecter les utilisateur existant

exports.login = (req, res, next) => {
  User.findOne(
    { where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.pwd) //la fonction compare de bcrypt permet de comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
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
