<template>

  <q-page class="flex film-detail">

    <div class="col q-pt-md film-detail__content">

      <film
        v-if="film.name"
        :film="film"
      ></film>

      <not-found
        :show="!film.name"
        :text="$t('notFoundFilm')"
      ></not-found>

      <footer-jirufik></footer-jirufik>

    </div>

    <scroll-up></scroll-up>

  </q-page>

</template>

<script>
  import pathExists from "jrf-path-exists";
  import {Loading} from "quasar";
  import Film from "../components/Film/Film";
  import NotFound from "../components/common/NotFound";
  import FooterJirufik from "../components/common/FooterJirufik";
  import wait from "../utils/wait";
  import ScrollUp from "../components/common/ScrollUp";

  export default {
    name: "FilmDetail",
    created() {

      this.$app.setTitle(this.$t('title.film', {name: ''}));

      const code = Number(pathExists(this, '$route.params.code', 0));
      Promise.resolve().then(this.loadFilm({code}));

    },

    beforeRouteUpdate(to, from, next) {

      const code = Number(pathExists(to, 'params.code', 0));
      if (code === Number(this.film.code)) {
        next(false);
        return;
      }

      Promise.resolve().then(this.loadFilm({code}));

      next();
    },

    data() {
      return {
        film: {}
      }
    },

    methods: {

      async loadFilm({code} = {}) {
        Loading.show();

        const res = await this.$jrfws.sendMes({route: 'films', act: 'get', data: {filter: {code}}, awaitRes: true});
        this.film = pathExists(res, '[0]', {});

        const name = pathExists(this, 'film.name', '');
        this.$app.setTitle(this.$t('title.film', {name}));

        Loading.hide();

      },

    },

    components: {
      ScrollUp,
      FooterJirufik,
      Film,
      NotFound
    }

  }
</script>

<style lang="sass">
  .film-detail
    .film-detail__content
      max-width: 800px
      margin-right: auto
      margin-left: auto


</style>
