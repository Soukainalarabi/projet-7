module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: type.INTEGER,
        field: "idUser",
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      nom: { type: type.STRING(256), field: "nom" },
      prenom: { type: type.STRING(256), field: "prenom" },

      email: { type: type.STRING(256), field: "email", unique: true },
      pwd: { type: type.STRING(256), field: "pwd" },
      image: { type: type.STRING(700), field: "image" },

    },

    {
      tableName: "user",
    }
  );
};
