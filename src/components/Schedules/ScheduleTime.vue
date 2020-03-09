<template>
  <div>

    <div
      class="row items-center cursor-pointer"
      @click="openFilm"
    >

      <div class="q-ma-sm q-px-xs rounded-borders" :class="color">
        {{timeTitle}}
      </div>

      <div class="q-ma-sm">{{time.film.name}}</div>

      <div class="q-ma-sm row">
        <schedule-ticket
          v-for="ticket of time.tickets"
          :key="ticket.ticket.name"
          :cost="Number(ticket.cost)"
          :ticket="ticket.ticket"
        ></schedule-ticket>
      </div>

    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import pathExists from "jrf-path-exists";
  import ScheduleTicket from "./ScheduleTicket";

  export default {
    name: "ScheduleTime",
    components: {ScheduleTicket},
    props: {
      time: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    computed: {
      timeTitle() {
        return moment(this.time.datetime).format('HH:mm');
      },
      color() {
        return this.$q.dark.isActive ? 'bg-yellow-10' : 'bg-yellow';
      }
    },

    methods: {
      openFilm() {
        const code = pathExists(this, 'time.film.code');
        if (!code) return;
        const routeData = this.$router.resolve({path: `films/${code}`});
        window.open(routeData.href, '_blank');
      }
    }

  }
</script>

<style lang="sass">
</style>
