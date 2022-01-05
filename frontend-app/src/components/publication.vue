<template>
  <div
    class="modal fade"
    id="exampleModal"
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
                  src="../assets/image/profil.jpeg"
                  width="30px"
                  height="30px"
                  class="card-img-circle"
                  alt="..."
                />
              </div>
              <div class="col-auto nom">Soukaina Larabi</div>
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Titre:</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="mb-3">
              <input
                type="file"
                class="form-control"
                aria-label="file example"
                accept=".jpg, .jpeg, .png, .gif"
                required
              />
              <div class="invalid-feedback">
                Example invalid form file feedback
              </div>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Texte:</label>
              <textarea class="form-control" id="message-text"></textarea>
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
          <button type="button" class="btn btn-primary">Publier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publication",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
