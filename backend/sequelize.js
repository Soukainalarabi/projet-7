const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const CommentaireModel = require("./models/commentaire");
const PublicationModel = require("./models/publication");
const config = require("./config/config.json");
const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
  }
);
module.exports = sequelize;

const User = UserModel(sequelize, Sequelize);
const Commentaire = CommentaireModel(sequelize, Sequelize);
const Publication = PublicationModel(sequelize, Sequelize);
Publication.belongsTo(User, {
  as: "user",
  foreignKey: "idUser",
}); // publication();
//User.hasMany(Publication)//user.getPublications();
Publication.hasMany(Commentaire, {
  as: "commentaires",
  foreignKey: "idPublication",
});
Commentaire.belongsTo(User, {
  as: "user",
  foreignKey: "idUser",
});

Commentaire.belongsTo(Publication, {
  as: "publication",
  foreignKey: "idPublication",
});
sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});
module.exports = {
  User,
  Publication,
  Commentaire,
};
