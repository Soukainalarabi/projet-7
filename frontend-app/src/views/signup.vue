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
              v-model="firstName"
              placeholder="Prénom"
              aria-label="First name"
              required="required"
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              v-model="lastName"
              placeholder="Nom"
              aria-label="Last name"
              required="required"
            />
          </div>
        </div>
        <div class="col-12">
          <label for="inputEmail4" class="form-label"></label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="email"
            aria-label="email"
            required="required"
          />
        </div>
        <div class="col-12">
          <label for="inputpwd10" class="form-label"></label>
          <input
            type="password"
            v-model="pwd"
            class="form-control"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
            required="required"
          />
        </div>

        <span v-if="error.pwdNoValid" style="color: red"
          >Le mot de passe n'est pas valide: la taille devrait être supérieur à
          6</span
        >
        <span v-for="err of error.backend" v-bind:key="err" style="color: red">
          {{ err }}<br />
        </span>
        <button
          class="btn btn-outline-primary"
          type="submit"
          @click="handleSubmit"
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
export default {
  props: ["nextUrl"],
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      pwd: "",
      // pwd_confirmation: "",
      is_admin: null,
      error: {
        pwdNoValid: false,

        backend: [],
      },
    };
  },

  methods: {
    goToHome() {
      this.$router.push("/login");
    },
    handleSubmit(e) {
      this.error = {
        pwdNoValid: false,
        backend: [],
      };
      e.preventDefault();
      let url = "http://localhost:3000/api/auth/signup";
      //let isValid = true;
      //Validation des données :
      if (!this.pwd || this.pwd.length < 6) {
        this.error.pwdNoValid = true;
        return;
      }
      this.$http
        .post(url, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          pwd: this.pwd,
        })
        .then(() => {
          this.goToHome();
        })
        .catch((error) => {
          if (error.response.data.errors) {
            this.error.backend = error.response.data.errors;
          }
        });
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
.form-signin input[type="pwd"] {
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
.form-check {
  padding-left: 3.5em;
}
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
