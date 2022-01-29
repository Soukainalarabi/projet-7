const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];// la fonction split pour tout obtenir après l'espace dans l'en-tête.
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");// la fonction de vérification pour décoder notre jeton. Si le jeton n'est pas valide, cela générera une erreur.
    const userId = decodedToken.userId; //Si la demande contient un ID utilisateur, on le compare  à celui extrait du jeton. S'ils ne sont pas identiques, lancez une erreur.
    req.userId=userId; //Sinon, tout va bien et l'utilisateur est authentifié — passez l'exécution en utilisant la fonction next().
    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};