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
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            @click="
              closeModal();
              creerPub();
            "
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
import $ from "jquery";

//import { Modal } from "bootstrap";

moment.locale("fr");
export default {
  name: "Publication",
  props: {},
  data() {
    return {
      modal: null,

      user: {
        imageUser: localStorage.getItem("userImage"),

        nom: localStorage.getItem("nom"),
        prenom: localStorage.getItem("prenom"),
      },
      image: "",
      title: "",
      text: "",
      imageFile: null,
    };
  },
  methods: {
    creerPub: function () {
      let pathApi = "/api/publications";
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
      this.$http
        .post(pathApi, formData)

        .then((response) => {
          let publicationToAdd = {
            id: response.data.idPublication,
            createdAt: moment(Date.now()).fromNow(),
            text: this.text,
            image: response.data.image,
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
          this.imageFile = null;
          this.$emit("publicationCreated", publicationToAdd);
        });
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
    save() {
      $("#ModalId").modal("hide");
      this.$emit("save");
    },
    closeModal: function () {
      if (this.title && this.text) {
        this.modal = "false";
      }
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
