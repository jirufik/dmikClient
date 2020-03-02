<template>
  <div
    class="row items-center"
    :class="classScheduleTime"
  >
    <div
      class="q-ma-sm q-px-xs bg-yellow rounded-borders"
      style="cursor: default;">
      {{time.time}}
      <q-tooltip>
        {{duration}}
      </q-tooltip>
    </div>
    <div
      class="row q-pa-sm q-gutter-xs items-center"
      style="cursor: default;">
      <q-icon
        v-if="isBigScreen"
        size="20px"
        name="la la-desktop"
        color="blue"
      >
        <q-tooltip>
          {{ticket.hallDescription}}
        </q-tooltip>
      </q-icon>
      <q-icon
        v-if="!isBigScreen"
        size="15px"
        name="la la-desktop"
        color="green"
      >
        <q-tooltip>
          {{ticket.hallDescription}}
        </q-tooltip>
      </q-icon>
      <div>
        {{ticket.hall.toLowerCase()}}
      </div>
    </div>
    <div class="column q-pa-sm">
      <schedule-ticket
        v-for="(ticket, index) of sortTickets"
        :key="index"
        :ticket="ticket"
      ></schedule-ticket>
    </div>

  </div>
</template>

<script>
  import ScheduleTicket from "./ScheduleTicket";
  import moment from 'moment'
  import pathExists from 'jrf-path-exists'

  export default {
    name: "ScheduleTime",
    props: {
      time: {
        type: Object,
        default() {
          return {}
        }
      },
      border: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      classScheduleTime() {
        return this.border ? 'schedule-time' : '';
      },
      sortTickets() {
        return this.time.tickets.sort((a, b) => a.cost - b.cost);
      },
      duration() {
        moment.locale('ru');
        const diff = moment(this.time.date).diff(moment());
        return moment.duration(diff).humanize(true);
      },
      ticket() {
        return pathExists(this, 'time.tickets[0]', {});
      },
      isBigScreen() {
        return this.ticket.hall.toLowerCase().includes('основной');
      },
    },

    components: {
      ScheduleTicket
    }
  }
</script>

<style lang="sass">

  .schedule-time
    border-top: 1px solid #e0e0e0;

</style>
