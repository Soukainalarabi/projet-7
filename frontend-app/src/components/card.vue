<template>
  <div
    class="card shadow-lg p-3 mb-5 bg-body raduis"
    v-for="publication of publications"
    v-bind:key="publication"
  >
    <div class="row">
      <div class="col-auto">
        <img
          :src="$baseUrl + publication.user.image"
          class="card-img-circle"
          alt="..."
        />
      </div>
      <div class="col-auto nom">
        {{ publication.user.nom + " " + publication.user.prenom }}
      </div>
      <div class="col-auto">{{ publication.createdAt }}</div>
      <div class="col">
        <div v-if="publication.user.id == userId" class="dropdown">
          <button
            class="btn-secondary"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="padding: 0px"
          >
            <i class="bi bi-three-dots"></i>
          </button>
          <ul class="dropdown-menu">
            <li
              class="dropdown-item"
              @click="openModalModification(publication)"
            >
              modifier
            </li>

            <li
              @click="supprimerPub(publication.id)"
              class="dropdown-item text-danger"
            >
              Supprimer
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ publication.title }}</h5>
      <p class="card-text">
        {{ publication.text }}
      </p>
      <img
        v-if="publication.image"
        :src="$baseUrl + publication.image"
        class="card-img"
        width="150px"
        alt="..."
      />
      <div class="d-flex justify-content-end">
        <button
          class="commentaire-number"
          @click="publication.showModal = !publication.showModal"
        >
          {{ publication.commentaires.length }} commentaires
        </button>
      </div>

      <hr />
      <ul class="list-group list-group-horizontal">
        <li
          @click="publication.postCommentShow = !publication.postCommentShow"
          class="list-group-item"
        >
          <button class="d-flex align-items-center">
            <i class="bi bi-messenger"></i>
            Commenter
          </button>
        </li>
      </ul>

      <hr />
      <div
        v-show="publication.showModal"
        class="comments"
        v-for="commentaire of publication.commentaires"
        v-bind:key="commentaire"
      >
        <div class="d-flex flex-row mb-2">
          <img
            :src="$baseUrl + commentaire.user.image"
            class="rounded-image"
            width="30px"
            height="30px"
          />
          <div class="d-flex flex-column ml-2">
            <span class="name">
              <!-- //////il faut ajouter un nom et un prénom pour les commentaires -->
              {{ commentaire.user.nom + " " + commentaire.user.prenom }}</span
            >
            <small v-show="commentaire.showCommentaire" class="comment-text">{{
              commentaire.commentaire
            }}</small>
            <div style="width: 100%" v-show="!commentaire.showCommentaire">
              <div class="d-flex flex-row ml-2 comment-text">
                <textarea
                  id="story"
                  v-model="commentaire.commentaire"
                  name="story"
                  data-bs-spy="scroll"
                  placeholder="Ecrivez un commentaire..."
                >
                </textarea>
                <button
                  class="btn-sm btn-primary"
                  type="submit"
                  @click="modifierCommentaire(commentaire, publication.id)"
                >
                  publier
                </button>
              </div>
            </div>
            <div class="flex-row align-items-center status">
              <small class="date">{{ commentaire.createdAt }} </small>

              <small v-if="commentaire.user.id == userId">
                <button @click="commentaire.showCommentaire = false">
                  Modifier
                </button>
              </small>
              <small v-if="commentaire.user.id == userId">
                <button @click="supprimerCom(commentaire.id, publication.id)">
                  Supprimer
                </button>
              </small>
            </div>
          </div>
        </div>
      </div>
      <div v-show="publication.postCommentShow" class="comment">
        <div class="d-flex flex-row ml-2">
          <img
            :src="$baseUrl + userImageUrl"
            class="rounded-image"
            width="30px"
            height="30px"
          />
          <div class="d-flex flex-row ml-2 comment-text">
            <textarea
              @click="publication.commentaireModel = ''"
              id="story"
              v-model="publication.commentaireModel"
              name="story"
              data-bs-spy="scroll"
              placeholder="Ecrivez un commentaire..."
            >
            </textarea>
            <button
              class="btn-sm btn-primary"
              type="submit"
              @click="
                envoyerCommentaire(publication.id, publication.commentaireModel)
              "
            >
              publier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Publication
    ref="publicationModal"
    @publicationCreated="addPublication($event)"
  />
</template>

<script>
import moment from "moment";
import Publication from "@/components/publication.vue";

moment.locale("fr");

export default {
  name: "Card",
  props: {},
  components: {
    Publication,
  },
  created() {
    let self = this;
    let pathApi = "/api/publications";
    this.userImageUrl = localStorage.getItem("userImage");
    this.userId = localStorage.getItem("userId");

    this.$http
      .get(pathApi)
      .then((publications) => {
        self.publications = publications.data;
        self.publications.forEach((pub) => {
          pub.commentaireModel = "Ecrivez un commentaire...";
          pub.postCommentShow = false; // pour afficher juste le commrntaire de la publication
          pub.showModal = false;
          pub.creationDate = moment(
            pub.createdAt,
            this.$datetimeFormat
          ).toDate();
          pub.createdAt = moment(pub.createdAt, this.$datetimeFormat).fromNow();
          pub.commentaires.forEach((com) => {
            com.creationDate = moment(
              com.createdAt,
              this.$datetimeFormat
            ).toDate();
            com.createdAt = moment(
              com.createdAt,
              this.$datetimeFormat
            ).fromNow();
            com.showCommentaire = true;
          });
        });
      })
      .catch((error) => console.log(error));
  },
  data: function () {
    return {
      showModal: false,
      userImageUrl: "",
      userId: "",
      publications: [],
    };
  },
  methods: {
    openModalModification: function (publication) {
      this.$refs.publicationModal.openModalModification(publication);
    },
    addPublication: function (publication) {
      let newPublications = this.publications
        .filter((pub) => pub.id != publication.id)
        .concat([publication]);
      this.publications = newPublications.sort(
        (a, b) => b.creationDate - a.creationDate
      );
    },
    envoyerCommentaire: function (pubId, commentaire) {
      let publication = this.publications.find((pub) => pub.id == pubId);
      if (!publication.commentaireModel) {
        // on n'envoie pas un commentaire vide
        return;
      }
      this.$http
        .post(`/api/publications/${pubId}/commentaire`, {
          text: commentaire,
        })
        .then((response) => {
          publication.commentaires.push({
            id: response.data.idCommentaire,
            commentaire: commentaire,
            creationDate: Date.now(),
            createdAt: moment(Date.now()).fromNow(),
            showCommentaire: true,
            user: {
              id: this.userId,
              image: localStorage.getItem("userImage"),
              nom: localStorage.getItem("nom"),
              prenom: localStorage.getItem("prenom"),
            },
          });

          publication.commentaireModel = "";
        });
    },
    modifierCommentaire: function (commentaire, pubId) {
      if (!commentaire.commentaire.trim()) {
        // on n'envoie pas un commentaire vide
        return;
      }
      this.$http
        .put(`/api/publications/${pubId}/commentaire/${commentaire.id}`, {
          text: commentaire.commentaire,
        })
        .then(() => {
          commentaire.showCommentaire = true;
        });
    },
    supprimerCom: function (idCommentaire, pubId) {
      let publication = this.publications.find((pub) => pub.id == pubId);
      this.$http
        .delete(`/api/publications/commentaire/${idCommentaire}`)
        .then(() => {
          publication.commentaires = publication.commentaires.filter(
            (com) => com.id != idCommentaire
          );
          console.log("supprimé");
        });
    },
    supprimerPub: function (pubId) {
      this.$http.delete(`/api/publications/${pubId}`).then(() => {
        this.publications = this.publications.filter((pub) => pub.id != pubId);
        console.log("publication supprimer");
      });
    },
  },
  // supprimer
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr {
  margin: 0;
}
.btn-secondary {
  color: black;
}
.card {
  margin-right: auto;
  margin-left: auto;
  margin-top: 7%;
  width: 70%;
  border-radius: 2%;
}
.row {
  margin-left: 0;
  margin-top: 1%;
  align-items: baseline;
}
.dropdown {
  padding-left: 89%;
}
/* //////////////////// */
.dropdown-menu {
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  position: absolute;
  inset: 15px 0px auto auto;
  margin: 0px;
  transform: translate3d(5px, 26px, 0px);
}
.col-9 {
  padding-left: 0px;
}
.justify-content-evenly {
  padding: 1%;
}
.list-group {
  display: flex;
  flex-direction: row;
}
.comment {
  margin-top: 1%;
}
.card-img {
  width: 100% !important;
  height: 500px;
}
.card-img-circle {
  border-radius: 48%;
  width: 40px;
  height: 40px;
}
.rounded-image {
  border-radius: 48%;
  width: 30px;
  height: 30px;
}
.status small {
  margin-right: 10px;
}
.comments {
  margin-top: 1%;
}
.btn-sm {
  background-color: blue !important;
  margin-top: auto;
  margin-bottom: auto;
}
button {
  border: none;
  background-color: white;
}
.btn-file {
  position: relative;
  overflow: hidden;
}
span input {
  cursor: pointer !important;
}
#file-upload-button {
  cursor: pointer !important;
}
.btn-file input[type="file"] {
  position: absolute;
  cursor: pointer !important;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  display: block;
}
textarea {
  background-color: #f5f5f5 !important;
  border: none;
  width: 92%;
}
.comment-text {
  border: 1px solid #c0c0c029;
  border-radius: 10px;
  background-color: #c0c0c029 !important;
  width: 100%;
  padding: 4px;
}
li {
  cursor: pointer;
}
.d-md-flex {
  align-items: center !important;
}
.d-flex {
  margin-left: 2px;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
}
.flex-column ml-2 {
  justify-content: none;
}
a {
  text-decoration: none;
  color: black;
}
.justify-content-end {
  padding-top: 1%;
}
.list-group-horizontal {
  background-color: #c6c4c400 !important;
}
.list-group-item {
  background-color: #c6c4c400 !important;
  border: none;
  padding-right: 1px;
  padding-left: 1px;
  font-size: 12px;
}
.list-group {
  justify-content: space-evenly !important;
}

i {
  padding-left: 0.5px;
}

@media (max-width: 699px) {
  .d-flex {
    display: flex !important;
    /* flex-direction: column; */
  }
  .row {
    margin-top: 0;
  }
  .row > * {
    margin-left: 0;
  }
  .card {
    width: 100% !important;
    margin-right: 0;
    margin-left: 0;
  }
  .card-img-circle {
    width: 20px;
    height: 27px;
  }
}
@media (min-width: 700px) and (max-width: 2400px) {
  .card {
    width: 70%;
  }
}
@media (max-width: 300px) {
  .row > * {
    padding-left: 0;
  }
}
@media (max-width: 390px) {
  button {
    font-size: 12px;
    margin-right: 0px;
    padding: 2px;
  }
  .status small[data-v-5c8289c0] {
    margin-right: 0px;
  }
  .date {
    font-size: 8px;
  }
}
</style>
