<template>
  <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    control-type="outline"
    control-color="white"
    padding
    arrows
    infinite
    autoplay
    height="40vh"
    class="bg-grey-1 shadow-2 rounded-borders"
  >
    <q-carousel-slide v-for="(film, index) of films"
                      :key="film.code"
                      :name="index"
                      :img-src="getImg(film)"
                      @click="openFilm(film)"
    >
      <carousel-slide-film
        :film="film"
      ></carousel-slide-film>
    </q-carousel-slide>

  </q-carousel>
</template>

<script>
  import CarouselSlideFilm from "./CarouselSlideFilm/CarouselSlideFilm";
  import getImgFilm from "../../../utils/getImgFilm";

  export default {
    name: "CarouselFilms",
    props: {
      films: {
        type: Array,
        default() {
          return []
        }
      }
    },

    data() {
      return {
        slide: 1
      }
    },

    methods: {

      getImg(film) {
        return getImgFilm({film, original: true});
      },

      openFilm(film) {
        const routeData = this.$router.resolve({path: `films/${film.code}`});
        window.open(routeData.href, '_blank');
      }

    },

    components: {
      CarouselSlideFilm
    }
  }
</script>

<style lang="sass">

</style>
