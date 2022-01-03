<template>
  <div class="text-center">
    <form class="form-signin">
      <img
        class="mb-4"
        src="../assets/image/logo.png"
        alt=""
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Groupomania</h1>
      <label for="inputEmail" class="sr-only"></label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Adresse e-mail "
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only"></label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Mot de passe"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        onclick=" window.location.href= '#/accueil' "
      >
        Se Connecter
      </button>

      <p class="mt-5 mb-3 text-muted">&copy; 2021-2022</p>
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

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
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
.btn-primary {
  color: #fff;
  background-color: #ffd7d7 !important;
  border-color: #ffd7d7 !important;
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