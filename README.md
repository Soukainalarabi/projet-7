# Prérequis d'installation:

- "npm" : Le gestionnaire de paquets par défaut pour Node.js
- Un base des donnnées Msql démarré.

# Installation:

-Récuperer depuis Github le repository du projet.

## Backend

- Aller vers le dossier ./backend.
- Importer les dépendances du projet backend en executant la commande suivante:

```bash
npm install
```

- Créer une nouvelle base de données dans l'instance Mysql.
- Configurer dans le fichier config l'accès de la base de données Mysql.

```json
{
  "db": {
    "username": "login", // le login de la base des données Mysql
    "password": "password", //Mot de passe de la base des données Mysql
    "database": "", //le nom de la base des données crée
    "host": "", //l'addresse ip de la base des données
    "dialect": "mysql" // A ne pas modifier
  }
}
```

- Démarrer le service backend en executant la commande suivante depuis le dossier ./backend
  Il faut être dans le chemin du projet ./backend afin d'exécuter le service backend

```bash
npm start
```

## frontend-app

- Aller vers le dossier ./frontend-app.
- si on a pas vue-cli installé le dans la machine en exécutant la commande suivante:

```bash
npm install -g @vue/cli

```

- Importer les dépendances du projet frontend en executant la commande suivante:

```bash
npm install
```

- démarrer le frontend-app :

```bash
npm run serve
```

Aller à l'url http://localhost:port/#/login et créer un nouveau compte.

##### A noter

- si le port ou l'adresse IP de l'instance backend sont changées, il faut configurer la nouvelle adresse dans
  frontend-app/assets/config/config.json.
