const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const CommentaireModel = require("./models/commentaire");
const PublicationModel = require("./models/publication");
const config = require("./config/config.json");
const { Hooks } = require("sequelize/dist/lib/hooks");
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
const USER_ALIAS = "user";
const User = UserModel(sequelize, Sequelize);
const Commentaire = CommentaireModel(sequelize, Sequelize);
const Publication = PublicationModel(sequelize, Sequelize);
Publication.belongsTo(User, {
  as: USER_ALIAS,
  foreignKey: "userId",
}); // publication();
//User.hasMany(Publication)//user.getPublications();
Publication.hasMany(Commentaire, {
  as: "commentaires",
  foreignKey: { name: "idPublication", allowNull: false },
  onDelete: 'cascade',
  hooks: true
});
Commentaire.belongsTo(User, {
  as: USER_ALIAS,
  foreignKey: "userId",
});

/*Commentaire.belongsTo(Publication, {
  as: "publication",
  foreignKey: "idPublication",
});*/
sequelize.sync({ alter: true }).then(() => {
  console.log(`Database & tables created!`);
});
module.exports = {
  User,
  Publication,
  Commentaire,
  USER_ALIAS
};
