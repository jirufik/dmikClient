<template>
  <q-page class="flex">

    <div class="col q-pt-md" style="max-width: 800px; margin-right: auto; margin-left: auto">

      <filter-films
        :ages="ages"
        :filter="filter"
        :set-filter="setFilter"
      ></filter-films>

      <film
        v-for="(film, index) of films"
        :key="index"
        :film="film"
      >
      </film>

      <div
        v-if="showMoreFilms"
        class="q-ma-md text-center"
      >
        <q-btn
          rounded
          @click="loadMoreFilms"
        >
          {{$t('showMoreFilms')}}
        </q-btn>
      </div>

      <not-found
        :show="!films.length"
        :text="$t('notFoundFilms')"
      ></not-found>

      <footer-jirufik></footer-jirufik>

    </div>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab outline icon="keyboard_arrow_up" color="dark"></q-btn>
    </q-page-scroller>

  </q-page>
</template>

<script>

  import {Loading} from 'quasar'
  import pathExists from 'jrf-path-exists'
  import Film from "../components/Films/Film";
  import FilterFilms from "../components/Films/Filter/FilterFilms";
  import {isEqual} from 'lodash'
  import NotFound from "../components/common/NotFound";
  import toBoolean from "../utils/toBoolean";
  import FooterJirufik from "../components/common/FooterJirufik";

  const LIMIT = 5;

  export default {
    name: 'Films',

    created() {

      this.$app.setTitle(this.$t('title.films'));

      const filter = pathExists(this, '$route.query');
      this.fillFilter({filter});

      Promise.all([
        this.loadAges(),
        this.loadFilms({filter: this.filter})
      ]);

    },

    beforeRouteUpdate(to, from, next) {

      const filter = pathExists(to, 'query', 0);

      if (isEqual(filter, {...this.filter})) {
        next(false);
        return;
      }

      this.fillFilter({filter, reset: true});
      Promise.resolve().then(this.loadFilms({filter: this.filter}));

      next();
    },

    data() {
      return {
        films: [],
        ages: [],
        filter: {
          limit: LIMIT,
          plusOne: true,
          offset: 0,
          contact: true,
          age: 18,
          soon: false,
          rental: false
        },
        showMoreFilms: false
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

      async setFilter({filter, reset = false}) {

        if (isEqual(filter, {...this.filter})) return;

        if (reset) {

          const query = pathExists(this, '$router.currentRoute.query');
          if (isEqual(query, {})) return;

          this.fillFilter({reset});

        } else {

          filter.limit = LIMIT;
          filter.offset = 0;

        }

        await this.$router.push({query: filter});

      },

      fillFilter({filter, reset = false}) {

        if (reset) {

          this.films = [];
          this.filter.limit = LIMIT;
          this.filter.plusOne = true;
          this.filter.offset = 0;
          this.filter.contact = true;
          this.filter.age = 18;
          this.filter.soon = false;
          this.filter.rental = false;

        }

        this.filter.limit = Number(pathExists(filter, 'limit', LIMIT));
        this.filter.plusOne = toBoolean(filter, 'plusOne', true);
        this.filter.offset = Number(pathExists(filter, 'offset', this.filter.offset));
        this.filter.contact = toBoolean(filter, 'contact', true);
        this.filter.age = Number(pathExists(filter, 'age', this.filter.age));
        this.filter.soon = toBoolean(filter, 'soon', this.filter.soon);
        this.filter.rental = toBoolean(filter, 'rental', this.filter.rental);

      },

      processShowMoreFilms({films = []} = {}) {

        if (films.length > this.filter.limit) {

          films.pop();
          this.showMoreFilms = true;

        } else {

          this.showMoreFilms = false;

        }

      },

      async loadMoreFilms() {

        this.filter.offset += LIMIT;
        await this.loadFilms();

      },

      async loadFilms({filter} = {}) {
        Loading.show();

        filter = filter || this.filter;
        const res = await this.$jrfws.sendMes({route: 'films', act: 'get', data: {filter}, awaitRes: true});

        if (filter.contact) {

          const films = res || [];
          this.processShowMoreFilms({films});
          this.films = this.films.concat(films);

        } else {
          this.films = res || [];
        }

        Loading.hide();

      },

      async loadAges() {
        const res = await this.$jrfws.sendMes({route: 'ages', act: 'get', awaitRes: true});
        this.ages = res || this.ages;
      }

    },

    components: {
      FooterJirufik,
      Film,
      FilterFilms,
      NotFound
    }
  }

</script>
