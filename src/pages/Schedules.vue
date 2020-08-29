<template>
  <q-page class="flex schedules">

    <div class="col q-pt-md schedules__content">

      <filter-schedule
        :filter="filter"
        :tickets="tickets"
        :halls="halls"
        :set-filter="setFilter"
      ></filter-schedule>

      <schedule-date :schedules="schedules"></schedule-date>

      <footer-jirufik></footer-jirufik>

    </div>

    <scroll-up></scroll-up>

  </q-page>
</template>

<script>

import pathExists from "jrf-path-exists";
import NotFound from "../components/common/NotFound";
import {Loading} from "quasar";
import moment from 'moment'
import ScheduleDate from "../components/Schedules/ScheduleDate";
import FilterSchedule from "../components/Schedules/Filter/FilterSchedule";
import {isEqual, cloneDeep} from "lodash";
import FooterJirufik from "../components/common/FooterJirufik";
import ScrollUp from "../components/common/ScrollUp";

export default {
  name: "Schedules",

  created() {

    this.$app.setTitle(this.$t('title.schedule'));

    const filter = pathExists(this, '$route.query');

    if (filter.hallIds) {
      filter.hallIds = filter.hallIds.split(',').map(el => Number(el));
    }

    if (filter.ticketIds) {
      filter.ticketIds = filter.ticketIds.split(',').map(el => Number(el));
    }

    this.fillFilter({filter});

    Promise.all([
      this.loadHalls(),
      this.loadTickets(),
      this.loadSchedules()
    ]);

  },

  beforeRouteUpdate(to, from, next) {

    const filter = pathExists(to, 'query', 0);

    if (filter.hallIds) {
      filter.hallIds = filter.hallIds.split(',').map(el => Number(el));
    }

    if (filter.ticketIds) {
      filter.ticketIds = filter.ticketIds.split(',').map(el => Number(el));
    }

    this.fillFilter({filter, reset: true});
    Promise.resolve().then(this.loadSchedules());

    next();
  },

  data() {
    return {
      halls: [],
      tickets: [],
      schedules: [],
      filter: {
        dateStart: moment().format('YYYY-MM-DD'),
        dateEnd: moment().add(4, 'day').format('YYYY-MM-DD'),
        hallIds: [],
        ticketIds: []
      }
    }
  },

  methods: {

    async setFilter({filter, reset = false}) {

      if (isEqual(filter, this.filter)) return;

      this.fillFilter({filter, reset});

      const query = {
        dateStart: this.filter.dateStart,
        dateEnd: this.filter.dateEnd
      };

      if (this.filter.hallIds.length) {
        query.hallIds = this.filter.hallIds.join(',');
      }

      if (this.filter.ticketIds.length) {
        query.ticketIds = this.filter.ticketIds.join(',');
      }

      try {
        await this.$router.push({path: '/schedules', query});
      } catch (e) {

      }

    },

    fillFilter({filter, reset = false}) {

      if (reset) {

        this.filter.dateStart = moment().format('YYYY-MM-DD');
        this.filter.dateEnd = moment().add(4, 'day').format('YYYY-MM-DD');
        this.filter.hallIds = [];
        this.filter.ticketIds = [];

      }

      this.filter.dateStart = pathExists(filter, 'dateStart', this.filter.dateStart);
      this.filter.dateEnd = pathExists(filter, 'dateEnd', this.filter.dateEnd);
      this.filter.hallIds = pathExists(filter, 'hallIds', this.filter.hallIds);
      this.filter.ticketIds = pathExists(filter, 'ticketIds', this.filter.ticketIds);

    },

    async loadSchedules({filter} = {}) {

      Loading.show();

      filter = filter || this.filter;
      const res = await this.$jrfws.sendMes({route: 'schedules', act: 'get', data: {filter}, awaitRes: true});
      if (filter.contact) {

        const schedules = res || [];

        this.schedules = this.schedules.concat(schedules);

      } else {
        this.schedules = res || [];
      }

      Loading.hide();

    },

    async loadHalls() {
      const res = await this.$jrfws.sendMes({route: 'halls', act: 'get', awaitRes: true});
      this.halls = res || this.halls;
    },

    async loadTickets() {
      let res = await this.$jrfws.sendMes({route: 'tickets', act: 'get', awaitRes: true});
      if (Array.isArray(res)) res = res.filter(el => el.id !== 4);
      this.tickets = res || this.tickets;
    },

    copyFilter() {

      const filter = {
        dateStart: this.filter.dateStart,
        dateEnd: this.filter.dateEnd,
        hallIds: [...this.filter.hallIds],
        ticketIds: [...this.filter.ticketIds],
      };

      return filter;

    }

  },

  components: {ScrollUp, FooterJirufik, FilterSchedule, ScheduleDate, NotFound}

}

</script>

<style lang="sass">
.schedules
  .schedules__content
    max-width: 800px
    margin-right: auto
    margin-left: auto
</style>
