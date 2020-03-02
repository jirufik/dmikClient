<template>
  <div class="schedule-date">
    <q-card class="q-mb-md q-ml-md q-mr-md"
            v-for="schedule of schedules"
            :key="schedule.date"
    >

      <q-card-section class="text-h6">
        {{getTitleDate(schedule)}}
      </q-card-section>

      <schedule-hall
        v-for="hall in schedule.halls"
        :key="hall.hall.name"
        :hall="hall"
      ></schedule-hall>

    </q-card>
  </div>
</template>

<script>
  import moment from "moment";
  import ScheduleHall from "./ScheduleHall";

  export default {
    name: "ScheduleDate",
    components: {ScheduleHall},
    props: {
      schedules: {
        type: Array,
        default() {
          return [];
        }
      }
    },

    methods: {
      getTitleDate(schedule) {

        if (!schedule.date) return '';
        moment.locale('ru');

        const dateSchedule = moment(schedule.date);
        const date = moment(schedule.date).startOf('day');
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
    }

  }
</script>

<style lang="sass">

  .schedule-date

</style>
