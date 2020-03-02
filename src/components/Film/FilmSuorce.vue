<template>
  <q-card-actions>
    <div class="q-ma-sm">{{$t('source')}}</div>
    <q-btn
      v-if="showDMIK"
      class="q-ma-sm"
      flat
      rounded
      color="primary"
      size="md"
      @click="openDMIK"
    >DMIK
    </q-btn>
    <q-btn
      v-if="showTMDb"
      class="q-ma-sm"
      flat
      rounded
      color="primary"
      size="md"
      @click="openTMDb"
    >TMDb
    </q-btn>
    <q-btn
      class="q-ma-sm"
      flat
      rounded
      color="primary"
      size="sm"
      @click="searchKinoPoisk"
    >Искать на КиноПоиске
    </q-btn>
  </q-card-actions>
</template>

<script>
  import pathExists from "jrf-path-exists";

  export default {
    name: "FilmSuorce",
    props: {
      film: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    computed: {
      showDMIK() {
        return Boolean(this.film.code);
      },

      showTMDb() {
        return Boolean(this.film.idTmdb);
      }
    },


    methods: {

      openDMIK() {

        const code = pathExists(this, 'film.code');
        if (!code) return;
        window.open(`http://www.dmik.ru/anons_${code}.htm`, '_blank');

      },

      openTMDb() {

        const id = pathExists(this, 'film.idTmdb');
        if (!id) return;
        window.open(`https://www.themoviedb.org/movie/${id}`, '_blank');

      },

      searchKinoPoisk() {

        const name = pathExists(this, 'film.originalName') || pathExists(this, 'film.name');
        if (!name) return;
        window.open(`https://www.kinopoisk.ru/index.php?kp_query=${name}`, '_blank');

      }

    },

  }
</script>

<style scoped>

</style>
