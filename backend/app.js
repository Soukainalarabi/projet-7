const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
app.use(express.json());
//DB Connection
require("./sequelize");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.post("/api/message", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});
app.use("/api/contenu/1", (req, res, next) => {
  const contenu = {
    userId: "Ayoub Er-raji",

    text: "Les infos de mon premier objet",
    image:
      "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
    datePub: "24/08/2021",
    commentaire: [
      {
        userIdComnt: "Soukaina larabi",
        message: "Commentaire 1",
        dateCmnt: "24/09/2021",
      },
    ],
  };
  res.status(200).json(contenu);
});

app.use("/api/publications", (req, res, next) => {
  const publications = [
    {
      userId: "Ayoub Er-raji",

      text: "Les infos de mon premier objet",
      image:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      datePub: "24/08/2021",
      commentaire: [
        {
          userIdComnt: "Soukaina larabi",
          message: "Commentaire 1",
          dateCmnt: "24/09/2021",
        },
      ],
    },
  ];
  res.status(200).json(publications);
});

module.exports = app;
