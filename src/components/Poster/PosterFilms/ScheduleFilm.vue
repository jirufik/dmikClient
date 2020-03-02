<template>
  <div>
    <div class="row text-subtitle1 q-ma-sm">
      {{$t('schedule', {date: getDateName})}}
    </div>
    <div
      v-for="time in getTimes"
      :key="time.time"
    >
      <schedule-time :time="time"></schedule-time>
    </div>
  </div>
</template>

<script>
  import getDateName from "../../../utils/getDateName";
  import pathExists from 'jrf-path-exists'
  import getTimes from "../../../utils/getTimes";
  import ScheduleTime from "./ScheduleTime";

  export default {
    name: "ScheduleFilm",
    props: {
      film: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    computed: {
      getDateName() {
        return getDateName(pathExists(this, 'film.schedule[0].date'));
      },
      getTimes() {
        return getTimes(this.film.schedule);
      }
    },

    components: {
      ScheduleTime
    }
  }
</script>

<style scoped>

</style>
