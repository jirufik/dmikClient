<template>
  <q-page class="flex poster">
    <div class="col">

      <carousel-films
        :films="posters"
      ></carousel-films>

      <div :class="classFilterBox">
        <filter-line
          :filter="filter"
          :class="classFilterLine"
        ></filter-line>
      </div>

      <poster-films
        style="max-width: 800px; margin: auto"
        :films="films"
      ></poster-films>

      <not-found
        style="max-width: 800px"
        :show="!films.length"
        :text="$t('noFilms')"
      ></not-found>

      <footer-jirufik></footer-jirufik>

    </div>

    <scroll-up></scroll-up>

  </q-page>
</template>

<script>

  import {Loading} from 'quasar'
  import pathExists from 'jrf-path-exists'
  import CarouselFilms from "../components/Poster/CarouselFilms/CarouselFilms";
  import FilterLine from "../components/Poster/FilterLine/FilterLine";
  import getDateLine from "../utils/getDateLine";
  import moment from 'moment'
  import PosterFilms from "../components/Poster/PosterFilms/PosterFilms";
  import getLastTimeFilm from "../utils/getLastTimeFilm";
  import NotFound from "../components/common/NotFound";
  import FooterJirufik from "../components/common/FooterJirufik";
  import wait from "../utils/wait";
  import ScrollUp from "../components/common/ScrollUp";

  export default {
    name: 'Poster',

    created() {

      this.$app.setTitle(this.$t('title.poster'));

      const offset = Number(pathExists(this, '$route.query.offset', 0));
      this.filter = this.fillFilter({offset});

      Promise.all([this.loadPosters(), this.loadFilms({offset})]);

    },

    beforeRouteUpdate(to, from, next) {

      const offset = Number(pathExists(to, 'query.offset', 0));
      this.filter = this.fillFilter({offset});
      Promise.resolve().then(this.loadFilms({offset}));

      next();
    },

    data() {
      return {
        posters: [],
        films: [],
        filter: []
      }
    },

    computed: {
      classFilterLine() {
        const isMobile = this.$q.platform.is.mobile;
        return isMobile ? 'filter-line__scroll' : 'filter-line';
      },
      classFilterBox() {
        const isMobile = this.$q.platform.is.mobile;
        return isMobile ? 'filter-box__scroll' : 'filter-box';
      }
    },

    methods: {

      async selectFilter({label}) {

        let date = new Date();
        let offset = 0;

        for (let i = 0; i < this.filter.length; i++) {

          const filter = this.filter[i];
          filter.selected = false;

          if (filter.label === label) {
            filter.selected = true;
            date = filter.date;
            offset = i;
          }

        }

        const curOffset = Number(pathExists(this, '$router.currentRoute.query.offset', 0));
        if (curOffset === offset) return;

        await this.$router.push({query: {offset}});

      },

      fillFilter({offset}) {

        const days = getDateLine({countDays: 8});

        const filter = [];
        for (let i = 0; i < days.length; i++) {

          const day = days[i];

          filter.push({
            label: day.label,
            func: () => this.selectFilter({label: day.label}),
            selected: i === offset
          });

        }

        return filter;

      },

      async loadFilms({offset} = {}) {
        Loading.show();

        const date = moment().add(offset, 'days');

        const res = await this.$jrfws.sendMes({route: 'films', act: 'get', data: {filter: {date}}, awaitRes: true});
        const films = res || [];

        this.films = films.filter(film => {
          const lastTime = getLastTimeFilm(film);
          return moment() < lastTime;
        });

        Loading.hide();

      },

      async loadPosters() {
        const res = await this.$jrfws.sendMes({route: 'poster', awaitRes: true});
        this.posters = res || [];
      }

    },

    components: {
      ScrollUp,
      FooterJirufik,
      CarouselFilms,
      FilterLine,
      PosterFilms,
      NotFound
    }
  }

</script>

<style lang="sass">

  .poster
    .filter-box
      &__scroll
        overflow: hidden
        height: 60px

    .filter-line
      max-width: max-content
      /*margin: auto*/
      margin: 8px auto 8px auto

      &__scroll
        white-space: nowrap
        overflow: auto
        width: 100%
        /*max-height: 100%*/
        padding: 0 16px 45px 16px
        overflow-y: hidden
        margin-left: 0
        margin-right: 0

</style>
