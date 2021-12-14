module.exports = (sequelize, type) => {
  return sequelize.define(
    "employe",
    {
      id: {
        type: type.INTEGER,
        field: "idEmploye",
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      nom: { type: type.STRING(30), field: "nom" },
      prenom: { type: type.STRING(30), field: "prenom" },

      email: { type: type.STRING(50), field: "email" },
      pwd: { type: type.STRING(10), field: "pwd" },
    },
    {
      tableName: "Employe",
    }
  );
};
