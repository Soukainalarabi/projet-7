module.exports = (sequelize, type) => {
  return sequelize.define(
    "publication",
    {
      id: {
        type: type.INTEGER,
        field: "idPublication",
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      text: { type: type.TEXT, field: "text" },
      image: { type: type.STRING(255), field: "image" },
      datePublication: { type: type.DATE, field: "datePublication" },
    },
    {
      tableName: "publication",
    }
  );
};
