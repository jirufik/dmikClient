<template>
  <div class="slide-film column">
    <div class="header full-width row absolute-top q-pa-md">
      <q-badge
        class="info"
        outline
        align="middle"
        :color="getColor">
        {{film.age}} +
      </q-badge>
      <q-space></q-space>
      <q-badge v-if=film.runtime
               class="info"
               outline
               align="middle"
               color="white">
        {{film.runtime}} мин.
      </q-badge>
    </div>
    <div class="footer full-width row absolute-bottom q-pa-md">
      <q-space></q-space>
      <q-badge
        v-if="getDaysLeft"
        class="info"
        outline
        align="middle"
        color="white">
        {{getDaysLeft}}
      </q-badge>
    </div>
  </div>
</template>

<script>
  import pathExists from 'jrf-path-exists'
  import {isNull} from 'lodash'

  export default {
    name: "CarouselSlideFilm",
    props: {
      film: Object
    },
    computed: {

      getColor() {

        const age = pathExists(this, 'film.age', 0);
        if (age < 12) return 'green';
        if (age > 11 && age < 16) return 'yellow';
        if (age > 15) return 'red';

      },

      getDaysLeft() {

        const daysLeft = pathExists(this, 'film.daysLeft', null);
        const inDays = pathExists(this, 'film.inDays', 0) - 1;

        if (inDays === 0) return this.$t('tomorrow');
        if (inDays > 0) return this.$tc('inDays', inDays);
        if (isNull(daysLeft)) return this.$t('soon');
        if (daysLeft === 1) return this.$t('tomorrowLastDay');
        if (daysLeft === 0) return this.$t('lastDay');
        if (!daysLeft) return '';

        return this.$tc('daysLeft', this.film.daysLeft);

      }

    }
  }
</script>

<style lang="sass">

  .slide-film
    .header
      background-color: rgba(0, 0, 0, 0)

      .info
        background-color: rgba(0, 0, 0, 0.5)
        height: 30px

    .footer
      .info
        background-color: rgba(0, 0, 0, 0.5)
        height: 30px

</style>
