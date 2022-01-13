<template>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img
        src="../assets/image/logo.png"
        width="30"
        height="30"
        alt=""
      />Groupomania
    </a>
    <button
      class="navbar-brand"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <i class="bi bi-plus-lg"></i>Ajouter une publication
    </button>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          class="card-img-circle"
          src="../assets/image/profil.jpeg"
          width="40px"
          height="40px"
        />
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li class="dropdown-item" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
          </svg>
          <div id="name">{{ user.nom }} {{ user.prenom }}</div>
        </li>

        <li @click="goLogin()">
          <a class="dropdown-item"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-power"
              viewBox="0 0 16 16"
            >
              <path d="M7.5 1v7h1V1h-1z" />
              <path
                d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"
              />
            </svg>

            Déconnexion</a
          >
        </li>
        <li>
          <a class="dropdown-item text-danger"
            ><i class="bi bi-trash"></i> Supprimer le compte</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      user: {
        nom: localStorage.getItem("nom"),
        prenom: localStorage.getItem("prenom"),
      },
    };
  },
  props: {},
  methods: {
    // deleteFind: function (index) {
    //   console.log(index);
    //   console.log(this.finds);
    //   this.finds.splice(index);
    // },

    goLogin() {
      //vider local storage
      localStorage.removeItem("token");

      localStorage.removeItem("userImage");
      localStorage.removeItem("nom");
      localStorage.removeItem("prenom");
      this.$router.push("/login");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-light {
  background-color: white !important;
}
.navbar-light .navbar-brand {
  color: #ffd8d8;
}
.navbar-brand {
  border: none;
  background-color: #f0f8ff00;
}
.navbar-light .navbar-toggler {
  border-radius: 50px;
  display: flex;
  align-items: center;
}
.btn-secondary {
  color: #fff;
  background-color: #fee0e0;
  border-color: #fee0e0;
}
.dropdown-menu {
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
}
.dropdown-item {
  display: flex;
  cursor: pointer;
  align-items: center;
}
.card-img-circle {
  border-radius: 48%;
}
i {
  padding-left: 0.5px;
}
</style>
