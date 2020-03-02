<template>
  <div class="column">

    <div v-if="film.runtime" class="row">
      <div :class="classHead">
        {{$t('runtime')}}
      </div>
      <div :class="classText">
        {{$t('time', {time: film.runtime})}}
      </div>
    </div>

    <div v-if="film.age" class="row">
      <div :class="classHead">
        {{$t('limit')}}
      </div>
      <div :class="classText + ' ' + classLimitText">
        {{film.age}} +
      </div>
    </div>

    <div v-if="genre" class="row">
      <div :class="classHead">
        {{$t('genre')}}
      </div>
      <div :class="classText">
        {{genre}}
      </div>
    </div>

    <div v-if="country" class="row">
      <div :class="classHead">
        {{$t('country')}}
      </div>
      <div :class="classText">
        {{country}}
      </div>
    </div>

    <div v-if="producer" class="row">
      <div :class="classHead">
        {{$t('producer')}}
      </div>
      <div :class="classText">
        {{producer}}
      </div>
    </div>

    <div v-if="vote" class="row">
      <div :class="classHead">
        {{$t('vote')}}
      </div>
      <div :class="classText">
        {{vote}}
      </div>
    </div>

    <div v-if="tagline" class="row">
      <div :class="classHead">
        {{$t('tagline')}}
      </div>
      <div :class="classText">
        {{tagline}}
      </div>
    </div>

  </div>
</template>

<script>
  import pathExists from "jrf-path-exists";
  import getGenre from "../../utils/getGenre";
  import getCountry from "../../utils/getCountry";

  export default {
    name: "InfoFilm",
    props: {
      film: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      genre() {
        return getGenre(this.film);
      },

      country() {
        return getCountry(this.film);
      },

      producer() {
        return pathExists(this, 'film.producer');
      },

      vote() {
        return Number(pathExists(this, 'film.vote'));
      },

      tagline() {
        return pathExists(this, 'film.tagline');
      },

      classLimitText() {

        const age = pathExists(this, 'film.age', 0);

        if (age < 12) return 'text-green';
        if (age > 11 && age < 16) return 'text-yellow';
        if (age > 15) return 'text-red';

      },

      classHead() {
        return 'text-grey-8 col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4'
      },

      classText() {
        return 'col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8'
      }

    }
  }
</script>

<style lang="sass">

</style>
