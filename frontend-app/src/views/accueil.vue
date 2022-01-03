<template>
  <div class="accueil container">
    <Nav />
    <hr />
    <main>
      <Card />
    </main>
    <Publication />
  </div>
</template>
<script>
// @ is an alias to /src
import Nav from "@/components/nav.vue";
import Card from "@/components/card.vue";
import Publication from "@/components/publication.vue";

export default {
  name: "Home",
  components: {
    Nav,
    Card,
    Publication,
  },
};
</script>
<style scoped>
hr {
  margin: 0;
}
</style>