<template>
  <div class="row q-gutter-xs items-center">
    <q-icon
      size="20px"
      name="la la-ticket-alt"
      :color="ticketColor"
    >
      <q-tooltip>
        {{ticket.ticketDescription}}
      </q-tooltip>
    </q-icon>
    <div>
      {{ticket.cost}} руб.
    </div>
    <div>
      {{ticket.ticket.toLowerCase()}}
    </div>
<!--    <q-icon-->
<!--      v-if="isBigScreen"-->
<!--      size="20px"-->
<!--      name="la la-desktop"-->
<!--      color="blue"-->
<!--    >-->
<!--      <q-tooltip>-->
<!--        {{ticket.hallDescription}}-->
<!--      </q-tooltip>-->
<!--    </q-icon>-->
<!--    <q-icon-->
<!--      v-if="!isBigScreen"-->
<!--      size="15px"-->
<!--      name="la la-desktop"-->
<!--      color="green"-->
<!--    >-->
<!--      <q-tooltip>-->
<!--        {{ticket.hallDescription}}-->
<!--      </q-tooltip>-->
<!--    </q-icon>-->
<!--    <div>-->
<!--      {{ticket.hall.toLowerCase()}}-->
<!--    </div>-->
  </div>
</template>

<script>
  export default {
    name: "ScheduleTicket",
    props: {
      ticket: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      isBigScreen() {
        return this.ticket.hall.toLowerCase().includes('основной');
      },
      ticketColor() {

        const ticket = this.ticket.ticket.toLowerCase().trim();

        if (ticket.includes('полный')) return 'blue';
        if (ticket.includes('льготный')) return 'yellow-14';
        if (ticket.includes('коллективный')) return 'deep-purple';
        if (ticket.includes('детский')) return 'green';

      }
    }
  }
</script>

<style scoped>

</style>
