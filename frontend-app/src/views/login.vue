<template>
  <div class="text-center">
    <div class="form-signin">
      <div class="shadow p-3 mb-5 bg-body rounded">
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
          v-model="email"
          class="form-control"
          placeholder="Adresse e-mail "
          required
          autofocus
        />
        <label for="inputpwd" class="sr-only"></label>
        <input
          type="password"
          id="inputpwd"
          class="form-control"
          v-model="pwd"
          placeholder="Mot de passe"
          required
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Mémoriser le mot de
            passe
          </label>
        </div>
        <div class="d-flex flex-column">
          <span style="color: red">{{ error }}</span>

          <button
            class="btn btn-outline-primary"
            type="submit"
            @click="handleConnect"
          >
            Se Connecter
          </button>
          <button class="btn btn-outline-secondary" @click="goToHome()">
            S'Inscrire
          </button>
        </div>
        <p class="mt-5 mb-3 text-muted">&copy; 2021-2022</p>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      email: "",
      pwd: "",
      error: "",
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/signup");
    },
    handleConnect: function (e) {
      e.preventDefault();
      var self = this;
      if (this.pwd.length > 0) {
        this.$http
          .post("/api/auth/login", {
            email: this.email,
            pwd: this.pwd,
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userImage", response.data.imageUrl);
            localStorage.setItem("nom", response.data.nom);
            localStorage.setItem("prenom", response.data.prenom);
            localStorage.setItem("userId", response.data.userId);

            if (localStorage.getItem("token") != null) {
              this.$emit("loggedIn"); //a supprimé
              this.$router.push("accueil");
            }
          })
          .catch(function (error) {
            self.error = error.response.data.error;
            console.error(error.response.data.error);
          });
      }
    },
  },
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
  max-width: 600px;
  padding: 15px;
  margin: 15% auto;
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
.shadow {
  border-radius: 2%;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="pwd"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.d-flex {
  align-items: center;
}
.btn {
  color: #fff;
  background-color: #ffd7d7 !important;
  border-color: #ffd7d7 !important;
  margin: 1%;
  width: 50%;
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
