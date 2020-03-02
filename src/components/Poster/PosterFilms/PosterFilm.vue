<template>
  <q-card class="q-mb-md q-ml-md q-mr-md">
    <q-card-section
      style="padding: 0 0 0 0"
    >

      <div class="row col-12 poster">

        <q-img
          :src="getImg"
          :class="classPoster"
          class="cursor-pointer"
          height="300px"
          width="200px"
          @click="openFilm"
        ></q-img>

        <div :class="classBlockFilm">
          <q-card-section>
            <div
              class="text-h6 cursor-pointer"
              @click="openFilm"
            >{{film.name}}</div>
          </q-card-section>
          <q-card-section :class="classInfoFilm">
            <info-film :film="film"></info-film>
          </q-card-section>
          <q-card-section>
            <more-text :text="film.about" :max-len="getMaxLen"></more-text>
          </q-card-section>
        </div>

      </div>

    </q-card-section>

    <q-separator></q-separator>

    <q-card-actions>
      <schedule-film :film="film"></schedule-film>
    </q-card-actions>
  </q-card>
</template>

<script>
  import getImgFilm from "../../../utils/getImgFilm";
  import InfoFilm from "./InfoFilm";
  import MoreText from "./MoreText";
  import ScheduleFilm from "./ScheduleFilm";
  import pathExists from "jrf-path-exists";

  export default {
    name: "PosterFilm",
    props: {
      film: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    computed: {
      classBlockFilm() {
        // 'col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8'
        const width = this.$q.screen.width;
        const colXS = width > 505 ? 'col-xs-6' : 'col-xs-12';
        const colSM = width > 690 ? 'col-sm-8' : 'col-sm-7';

        return `${colXS} ${colSM} col-md-8 col-lg-8 col-xl-8`;

      },
      classInfoFilm() {
        const count = pathExists(this, 'film.genre', []).length;
        return count > 1 ? 'q-pt-none q-pb-none' : 'q-pt-none';
      },
      getMaxLen() {

        const width = this.$q.screen.width;
        const oneRow = 64;
        const genres = pathExists(this, 'film.genre', []);
        // const isLandscape = this.$q.screen.width > this.$q.screen.height;
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

        // if (isLandscape) {
        //
        //   if (width < 600) return 100;
        //   if (width < 689) return 300;
        //   if (width >= 689 && width < 755) return 370 + rows;
        //   return 450 + rows;
        //
        // } else {
        //
        //   if (width < 600) return 100;
        //   if (width < 689) return 300;
        //   if (width >= 689 && width < 755) return 370 + rows;
        //   return 450 + rows;
        //
        // }

      },

      getImg() {
        return getImgFilm({film: this.film});
      },

      isXS() {
        return this.$q.screen.xs;
      },

      classPoster() {
        return this.isXS ? 'rounded-borders __xs' : 'rounded-borders  __no-xs'
      }
    },

    methods: {
      openFilm() {
        const code = pathExists(this, 'film.code');
        if (!code) return;
        const routeData = this.$router.resolve({path: `films/${code}`});
        window.open(routeData.href, '_blank');
      }
    },

    components: {
      InfoFilm,
      MoreText,
      ScheduleFilm
    }

  }
</script>

<style lang="sass">

  .poster
    .__no-xs
      margin: 16px 0 16px 16px

    .__xs
      margin: 16px 16px 0 16px

</style>
