<template>
  <div class="row q-gutter-xs items-center">
    <q-icon
      size="20px"
      name="la la-ticket-alt"
      :color="ticketColor"
    >
      <q-tooltip>
        {{ticket.description}}
      </q-tooltip>
    </q-icon>
    <div class="text-caption q-pr-xs">
      {{cost}}
    </div>
  </div>
</template>

<script>
  import pathExists from "jrf-path-exists";

  export default {
    name: "ScheduleTicket",
    props: {
      cost: Number,
      ticket: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      ticketColor() {

        const name = pathExists(this, 'ticket.name').toLowerCase().trim();

        if (name.includes('полный')) return 'blue';
        if (name.includes('льготный')) return 'yellow-14';
        if (name.includes('коллективный')) return 'deep-purple';
        if (name.includes('детский')) return 'green';

      }
    }
  }
</script>

<style scoped>

</style>
