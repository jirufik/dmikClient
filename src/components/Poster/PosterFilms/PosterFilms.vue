<template>
  <div class="q-ma-md column">
    <poster-film
      v-for="film of films"
      :key="film.code"
      :film="film"
    ></poster-film>
  </div>
</template>

<script>
  import PosterFilm from "./PosterFilm";

  export default {
    name: "PosterFilms",
    props: {
      films: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      PosterFilm
    }
  }
</script>

<style scoped>

</style>
