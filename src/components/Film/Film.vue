<template>
  <q-card class="q-mb-md q-ml-md q-mr-md film-info">

    <q-card-section class="film-info__content">

      <div class="row col-12">

        <q-img
          :src="getImg"
          height="300px"
          width="200px"
          :class="classInfoImg"
          class="rounded-borders"
        ></q-img>

        <div :class="classAboutFilm">
          <q-card-section>
            <div class="text-h6">{{film.name}}</div>
            <div
              v-if="showOriginalName"
              class="text-caption">
              {{film.originalName}}
            </div>
          </q-card-section>
          <q-card-section :class="classAboutFilmMain">
            <info-film :film="film"></info-film>
          </q-card-section>
        </div>

      </div>

      <q-card-section>
        <more-text :text="film.about" :max-len="getMaxLen"></more-text>
      </q-card-section>

    </q-card-section>

    <q-separator></q-separator>

    <film-suorce :film="film"></film-suorce>

    <q-separator></q-separator>

    <q-card-actions>
      <div
        class="q-ma-sm q-px-xs rounded-borders"
        :class="classDays"
      >{{daysLeftStr.days}}
      </div>
      <div class="q-ma-sm">{{daysLeftStr.period}}</div>
    </q-card-actions>

    <q-separator></q-separator>

    <schedule :film="film"></schedule>

  </q-card>
</template>

<script>
  import getImgFilm from "../../utils/getImgFilm";
  import pathExists from "jrf-path-exists";
  import InfoFilm from "./InfoFilm";
  import MoreText from "./MoreText";
  import moment from "moment";
  import {isNull} from "lodash";
  import FilmSuorce from "./FilmSuorce";
  import Schedule from "./Schedule";

  export default {
    name: "Film",

    props: {
      film: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    computed: {

      showOriginalName() {

        const originalName = pathExists(this, 'film.originalName');
        if (!originalName) return false;

        return originalName.trim().toLowerCase() !== this.film.name.trim().toLowerCase();

      },

      getImg() {
        const img = getImgFilm({film: this.film});
        return img;
      },

      isXS() {
        return this.$q.screen.xs;
      },

      classInfoImg() {
        return this.isXS ? 'film-info__img_xs' : 'film-info__img'
      },

      classAboutFilm() {
        // 'col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8'
        const width = this.$q.screen.width;
        const colXS = width > 505 ? 'col-xs-6' : 'col-xs-12';
        const colSM = width > 690 ? 'col-sm-8' : 'col-sm-7';

        return `${colXS} ${colSM} col-md-8 col-lg-8 col-xl-8`;

      },

      classAboutFilmMain() {
        const count = pathExists(this, 'film.genre', []).length;
        return count > 1 ? 'q-pt-none q-pb-none' : 'q-pt-none';
      },

      classDays() {

        const rental = pathExists(this, 'film.rental');
        const soon = pathExists(this, 'film.soon');

        if (!rental && !soon) return 'bg-blue';
        else if (rental) return this.$q.dark.isActive ? 'bg-yellow-10' : 'bg-yellow';
        else if (soon) return 'bg-green';

      },

      daysLeft() {

        let dateEnd = pathExists(this, 'film.dateEnd');

        if (!dateEnd) return null;

        dateEnd = moment(dateEnd).startOf('day');
        const now = moment().startOf('day');

        const days = dateEnd.diff(now, 'days');
        return days;

      },

      inDays() {

        let dateStart = pathExists(this, 'film.dateStart');

        if (!dateStart) return null;

        dateStart = moment(dateStart).startOf('day');
        const now = moment().startOf('day');

        const days = dateStart.diff(now, 'days') - 1;
        return days;

      },

      daysLeftStr() {

        const daysLeft = this.daysLeft;
        const rental = pathExists(this, 'film.rental');
        const soon = pathExists(this, 'film.soon');

        let days = '';
        if (!rental && soon) days = this.inDays ? this.$tc('inDays', this.inDays) : isNull(this.inDays) ? this.$t('soon') : this.$t('tomorrow');
        else if (daysLeft === 1) days = this.$t('tomorrowLastDay');
        else if (daysLeft === 0) days = this.$t('lastDay');
        else if (!daysLeft || daysLeft < 0) days = this.$t('showEnd');
        else days = this.$tc('daysLeft', daysLeft);

        let period = '';
        if (rental || soon) {

          const dateStart = pathExists(this, 'film.dateStart');
          const dateEnd = pathExists(this, 'film.dateEnd');
          moment.locale('ru');
          if (dateStart && dateEnd) {
            period = `${moment(dateStart).format('DD MMMM')} - ${moment(dateEnd).format('DD MMMM')}`;
          }

        }

        return {days, period};

      },

      getMaxLen() {

        const width = this.$q.screen.width;
        const oneRow = 64;
        const genres = pathExists(this, 'film.genre', []);

        let rows = 0;

        if (!Number(this.film.runtime)) ++rows;
        if (!Number(this.film.age)) ++rows;
        if (!genres.length) rows += 2;
        if (genres.length === 1) ++rows;
        if (this.film.name.length > 34) --rows;

        rows = rows * oneRow;

        if (width < 600) return 100;
        if (width < 689) return 300;
        if (width >= 689 && width < 755) return 370 + rows;
        return 450 + rows;

      },

    },

    components: {
      InfoFilm,
      MoreText,
      FilmSuorce,
      Schedule
    }

  }
</script>

<style lang="sass">

  .film-info
    .film-info__content
      padding: 0 0 0 0

    .film-info__img
      margin: 16px 0 16px 16px

      &_xs
        margin: 16px 16px 0 16px

</style>
