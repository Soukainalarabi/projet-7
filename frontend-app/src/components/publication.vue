<template>
  <div
    class="modal fade"
    id="exampleModal"
    ref="exampleModal"
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
            <div v-if="!image">
              <p>Choisir une image :</p>
              <input type="file" @change="onFileChange" />
            </div>
            <div v-else>
              <img class="imageFile" :src="image" />
              <button @click="removeImage">Remove image</button>
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
          <button type="button" class="btn btn-secondary" @click="closeModal()">
            Fermer
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            @click="createOrUpdatePub()"
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Modal } from "bootstrap";

moment.locale("fr");
export default {
  name: "Publication",
  props: {},
  mounted() {
    this.modal = new Modal(this.$refs.exampleModal);
  },
  data() {
    return {
      pathApi: "/api/publications",
      modal: null,
      user: {
        imageUser: localStorage.getItem("userImage"),
        id: localStorage.getItem("userId"),
        nom: localStorage.getItem("nom"),
        prenom: localStorage.getItem("prenom"),
      },

      pubId: null,
      createdAt: null,
      image: "",
      title: "",
      text: "",
      imageFile: null,
    };
  },
  methods: {
    makePubVue: function (pubId, image) {
      let publicationToAdd = {
        id: pubId,
        creationDate: this.createdAt
          ? moment(this.createdAt).toDate()
          : moment(Date.now()).toDate(),
        createdAt: this.createdAt
          ? moment(this.createdAt).fromNow()
          : moment(Date.now()).fromNow(),
        text: this.text,
        image: image,
        title: this.title,
        commentaires: [],
        user: {
          id: localStorage.getItem("userId"),
          image: localStorage.getItem("userImage"),
          nom: localStorage.getItem("nom"),
          prenom: localStorage.getItem("prenom"),
        },
      };

      this.imageFile = null;
      this.$emit("publicationCreated", publicationToAdd);

      //réinitialiser les params de modal
      this.pubId = null;
      this.createdAt = null;
      this.image = "";
      this.title = "";
      this.text = "";
      this.imageFile = null;

      this.closeModal();
    },
    createOrUpdatePub: function () {
      let publication = {
        text: this.text,
        image: this.image,

        title: this.title,
      };
      if (!publication.title && !publication.text) {
        return;
      }

      const formData = new FormData();
      formData.append("text", this.text);
      formData.append("title", this.title);
      if (this.imageFile) {
        formData.append("image", this.imageFile, this.imageFile.name);
      }
      if (this.pubId) {
        this.$http
          .put(`${this.pathApi}/${this.pubId}`, formData)

          .then((response) => this.makePubVue(this.pubId, response.data.image));
        return;
      }
      this.$http
        .post(this.pathApi, formData)

        .then((response) =>
          this.makePubVue(response.data.idPublication, response.data.image)
        );
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      // var image = new Image();
      this.imageFile = file;
      var reader = new FileReader();
      var self = this;

      reader.onload = (e) => {
        self.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.image = "";
    },
    //modal dismis ////////

    openModal: function () {
      this.modal.show();
    },
    openModalModification: function (publication) {
      this.pubId = publication.id;
      this.title = publication.title;
      this.text = publication.text;
      this.createdAt = publication.creationDate;
      this.modal.show();
    },
    closeModal: function () {
      this.modal.hide();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.imageFile {
  width: 50%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.card-img-circle {
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
