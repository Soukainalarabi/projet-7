const Sequelize = require("sequelize");
const EmployeModel = require("./models/employe");
const CommentaireModel = require("./models/commentaire");
const PublicationModel = require("./models/publication");

const sequelize = new Sequelize("groupomania", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
});
module.exports = sequelize;

const Employe = EmployeModel(sequelize, Sequelize);
const Commentaire = CommentaireModel(sequelize, Sequelize);
const Publication = PublicationModel(sequelize, Sequelize);
Publication.belongsTo(Employe, {
  as: "employe",
  foreignKey: "idEmploye",
}); // publication();
//Employe.hasMany(Publication)//employe.getPublications();
Publication.hasMany(Commentaire, {
  as: "commentaires",
  foreignKey: "idPublication",
});
Commentaire.belongsTo(Employe, {
  as: "employe",
  foreignKey: "idEmploye",
});
sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});
module.exports = {
  Employe,
  Publication,
  Commentaire,
};
