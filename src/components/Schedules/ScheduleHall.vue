<template>
  <div>

    <q-separator></q-separator>

    <div class="row items-center q-pa-md q-gutter-sm">
      <q-icon
        :size="sizeHall"
        name="la la-desktop"
        :color="colorHall"
      >
        <q-tooltip>
          {{hall.hall.description}}
        </q-tooltip>
      </q-icon>
      <div class="text-subtitle1">
        {{hall.hall.name}}
      </div>
    </div>

    <schedule-time
      v-for="time of hall.times"
      :key="time.datetime"
      :time="time"
    ></schedule-time>

  </div>
</template>

<script>
  import pathExists from "jrf-path-exists";
  import ScheduleTime from "./ScheduleTime";

  export default {
    name: "ScheduleHall",
    components: {ScheduleTime},
    props: {
      hall: Object,
      default() {
        return {}
      }
    },

    computed: {
      isBigScreen() {
        const name = pathExists(this, 'hall.hall.name', '').toLocaleLowerCase();
        return name.includes('основной');
      },

      sizeHall() {
        return this.isBigScreen ? '20px' : '15px';
      },

      colorHall() {
        return this.isBigScreen ? 'blue' : 'green';
      }
    }

  }
</script>

<style lang="sass">
</style>
