<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
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
            <div class="row">
              <div class="col-auto example-block">
                <img
                  class="image"
                  src="https://i.imgur.com/q3Q5A5e.gif"
                  alt="Smiling Face With Heart-Eyes"
                  title="Smiling Face With Heart-Eyes"
                  width="34"
                  height="34"
                />
              </div>
              <div class="col-auto example-block">
                <img
                  class="image"
                  src="https://i.imgur.com/v4eoLxA.png"
                  alt="Eyes"
                  title="Eyes"
                  width="24"
                  height="24"
                />
              </div>
              <div class="col-auto example-block">
                <img
                  class="image"
                  src="https://i.imgur.com/RVyqzqU.png"
                  alt="Thinking Face"
                  title="Thinking Face"
                  width="24"
                  height="24"
                />
              </div>
              <div class="col-auto example-block">
                <img
                  class="kg-image image"
                  src="https://i.imgur.com/EPxyW4M.gif"
                  width="24"
                  height="24"
                />
              </div>
              <div class="col-auto example-block">
                <img
                  class="image"
                  src="https://i.imgur.com/q3Q5A5e.gif"
                  alt="Smiling Face With Heart-Eyes"
                  title="Smiling Face With Heart-Eyes"
                  width="34"
                  height="34"
                />
              </div>
              <div class="col-auto example-block">
                <img
                  class="image"
                  src="https://i.imgur.com/ONLx0Eu.png"
                  alt="Bell"
                  title="Bell"
                  width="24"
                  height="24"
                />
              </div>
              <div class="col-auto example-block">
                <img
                  class="image"
                  src="https://i.imgur.com/v4eoLxA.png"
                  alt="Eyes"
                  title="Eyes"
                  width="24"
                  height="24"
                />
              </div>
              <div class="col-auto example-block">
                <img
                  class="kg-image image"
                  src="https://i.imgur.com/EPxyW4M.gif"
                  width="24"
                  height="24"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Send message</button>
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
