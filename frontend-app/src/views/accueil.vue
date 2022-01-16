<template>
  <div class="accueil container">
    <Nav />
    <hr />
    <main>
      <Card />
    </main>
  </div>
</template>
<script>
// @ is an alias to /src
import Nav from "@/components/nav.vue";
import Card from "@/components/card.vue";

export default {
  name: "Home",
  components: {
    Nav,
    Card,
  },
};
</script>
<style scoped>
hr {
  margin: 0;
}
</style>
