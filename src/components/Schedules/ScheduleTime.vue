<template>
  <div>

    <div
      class="row items-center cursor-pointer"
      @click="openFilm"
    >

      <div class="q-ma-sm q-px-xs rounded-borders" :class="color">
        {{ timeTitle }}
      </div>

      <div class="q-ma-sm">
        {{ time.film.name }}
        <q-tooltip content-style="background-color: rgba(255, 255, 255, 0)">
          <q-img
            :src="getImg"
            height="300px"
            width="200px"
            :class="classInfoImg"
            class="rounded-borders"
          ></q-img>
        </q-tooltip>
      </div>

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
import getImgFilm from "src/utils/getImgFilm";

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
    },
    classInfoImg() {
      return this.isXS ? 'film-info__img_xs' : 'film-info__img'
    },
    getImg() {
      const img = getImgFilm({film: this.time.film});
      return img;
    },
  },

  methods: {
    openFilm() {
      const code = pathExists(this, 'time.film.code');
      if (!code) return;
      const routeData = this.$router.resolve({path: `films/${code}`});
      window.open(routeData.href, '_blank');
    },
  }

}
</script>

<style lang="sass">
</style>
