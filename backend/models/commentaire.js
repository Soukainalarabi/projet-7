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

      dateCommentaire: { type: type.DATE, field: "dateCommentaire" },
    },
    {
      tableName: "commentaire",
    }
  );
};
