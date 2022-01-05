module.exports = (sequelize, type) => {
  return sequelize.define(
    "commentaire",
    {
      id: {
        type: type.INTEGER,
        field: "idCommentaire",
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      text: { type: type.TEXT, field: "text" },
      image: { type: type.STRING(255), field: "image" },

    },
    {
      tableName: "commentaire",
    }
  );
};
