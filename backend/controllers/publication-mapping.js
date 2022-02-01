//ici c'est les éléments qu'on va récupérer si on veut afficher une publication 
mapPublication = function (publication) {
    return {
        id: publication.id,
        image: publication.image,
        text: publication.text,
        title: publication.title,
        createdAt: publication.createdAt,
        user: {
            id: publication.user.id,
            nom: publication.user.nom,
            prenom: publication.user.prenom,
            image: publication.user.image

        },
        commentaires: mapCommentaires(publication.commentaires)
    }
}

mapPublications = function (publications) {
    let result = [];
    for (const publication of publications) {
        result.push(mapPublication(publication))

    } return result;
}
//ici c'est les éléments qu'on va récupérer si on veut afficher un commentaire 
function mapCommentaires(commentaires) {
    let result = [];

    for (const commentaire of commentaires) {
        result.push({
            id: commentaire.id,
            commentaire: commentaire.text,

            createdAt: commentaire.createdAt,

            user: {
                id: commentaire.user.id,
                nom: commentaire.user.nom,
                prenom: commentaire.user.prenom,
                image: commentaire.user.image

            }
        })

    }


    return result;
}

module.exports = { mapPublication, mapPublications };