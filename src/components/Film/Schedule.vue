<template>
  <div>
    <div
      v-for="(schedule, index) of getDates"
      :key="index"
    >
      <q-separator></q-separator>
      <div class="text-subtitle1 q-pl-md">
        {{getTitleDate(schedule)}}
      </div>
      <q-card-actions
        v-for="time in getTimes(schedule)"
        :key="time.time"
      >
        <schedule-time
          :time="time"
          :border="false"
        ></schedule-time>
      </q-card-actions>
    </div>
  </div>
</template>

<script>
  import getDateName from "../../utils/getDateName";
  import getTimes from "../../utils/getTimes";
  import pathExists from 'jrf-path-exists'
  import getDates from "../../utils/getDates";
  import ScheduleTime from "../Poster/PosterFilms/ScheduleTime";
  import moment from 'moment'

  export default {
    name: "Schedule",
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
      getDates() {
        return getDates(this.film.schedule);
      },
    },

    methods: {

      getTimes(schedule) {
        return getTimes(schedule);
      },

      getTitleDate(schedule) {

        if (!schedule.length) return '';
        moment.locale('ru');

        const dateSchedule = moment(schedule[0].date);
        const date = moment(schedule[0].date).startOf('day');
        const now = moment().startOf('day');
        const diff = date.diff(now, 'day');

        let prefix = '';
        if (diff === 0) prefix = this.$t('today');
        else if (diff === 1) prefix = this.$t('tomorrow');
        else {
          prefix = dateSchedule.format('dd');
          prefix = `${prefix[0].toUpperCase()}${prefix[1]}`;
        }

        return `${prefix} ${dateSchedule.format('DD MMMM')}`;
      }

    },

    components: {
      ScheduleTime
    }

  }

</script>

<style scoped>

</style>
