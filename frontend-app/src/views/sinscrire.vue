<template>
  <div class="text-center">
    <form class="form-signin">
      <img
        class="mb-4"
        src="../assets/image/logo.png"
        alt=""
        width="100"
        height="100"
      />
      <h1 class="mb-3 font-weight-normal">Groupomania</h1>

      <!-- ////// -->
      <div class="shadow p-5 mb-5 bg-body rounded">
        <h4 class="mb-3">Créer un compte</h4>

        <div class="row g-3">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Prénom"
              aria-label="First name"
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Nom"
              aria-label="Last name"
            />
          </div>
        </div>
        <div class="col-12">
          <label for="inputEmail4" class="form-label"></label>
          <input
            type="mail"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="email"
            aria-label="email"
          />
        </div>
        <div class="col-12">
          <label for="inputPassword10" class="form-label"></label>
          <input
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
          />
        </div>
        <div class="col">
          <label for="bday" class="col-12"
            >Veuillez saisir votre date de naissance :</label
          >
          <input type="date" id="bday" name="bday" class="form-control" />
        </div>
        <div class="row">
          <p>Genre :</p>

          <div class="form-check">
            <input
              id="credit"
              name="paymentMethod"
              type="radio"
              class="form-check-input"
              required
            />
            <label class="form-check-label" for="credit">Femme</label>
          </div>
          <div class="form-check">
            <input
              id="debit"
              name="paymentMethod"
              type="radio"
              class="form-check-input"
              required
            />
            <label class="form-check-label" for="debit">Homme</label>
          </div>
        </div>
        <button
          class="btn btn-outline-primary"
          type="submit"
          onclick=" window.location.href= '#/accueil' "
        >
          S'inscrire
        </button>

        <!-- //////// -->
        <p class="mt-5 mb-3 text-muted">&copy; 2021-2022</p>
      </div>
    </form>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.row > * {
  width: auto !important;
  margin-top: 1%;
}
.form-signin {
  width: 100%;
  max-width: 460px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
h1 {
  color: #ffd7d7;
}
.form-signin {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.col-12 {
  text-align: initial;
}
.mb-3 {
  margin-bottom: 3rem !important;
}
.btn {
  color: #fff;
  background-color: #ffd7d7 !important;
  border-color: #ffd7d7 !important;
  margin: 1%;
  width: 50%;
}
.text-center {
  padding: 10%;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
