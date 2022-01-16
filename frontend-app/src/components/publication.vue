<template>
  <div
    class="modal fade"
    id="exampleModal"
    ref="pubModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Créer une publication
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-auto">
                <img
                  :src="$baseUrl + user.imageUser"
                  class="card-img-circle"
                  alt="..."
                />
              </div>
              <div class="col-auto nom">{{ user.nom }} {{ user.prenom }}</div>
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Titre:</label>
              <input
                type="text"
                v-model="title"
                class="form-control"
                id="recipient-name"
              />
            </div>
            <div class="mb-3">
              <input
                type="file"
                class="form-control"
                aria-label="file example"
                accept=".jpg, .jpeg, .png, .gif"
              />
              <div class="invalid-feedback">
                Example invalid form file feedback
              </div>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Texte:</label>
              <textarea
                class="form-control"
                id="message-text"
                v-model="text"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button type="button" class="btn btn-primary" @click="creerPub()">
            Publier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
//import { Modal } from "bootstrap";

moment.locale("fr");
export default {
  name: "Publication",
  props: {},
  data() {
    return {
      user: {
        imageUser: localStorage.getItem("userImage"),

        nom: localStorage.getItem("nom"),
        prenom: localStorage.getItem("prenom"),
      },
      // image: `images/${req.file.filename}`,
      title: "",
      text: "",
    };
  },
  methods: {
    creerPub: function () {
      console.log("ee");
      let pathApi = "/api/publications";
      let publication = {
        text: this.text,
        title: this.title,
      };
      if (!publication.title && !publication.text) {
        return;
      }

      this.$http
        .post(pathApi, publication)

        .then((response) => {
          let publicationToAdd = {
            id: response.data.idPublication,
            createdAt: moment(Date.now()).fromNow(),
            text: this.text,
            title: this.title,
            commentaires: [],
            user: {
              id: this.userId,
              image: localStorage.getItem("userImage"),
              nom: localStorage.getItem("nom"),
              prenom: localStorage.getItem("prenom"),
            },
          };

          //var myModal = new Modal(document.getElementById//("exampleModal"));
          //myModal.hide();

          this.$emit("publicationCreated", publicationToAdd);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
img {
  width: 30px !important;
  height: 30px !important;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
