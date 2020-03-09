<template>
  <div
    :class="classFilterLine"
    class="filter-line"
  >
    <div
      :class="classFilterLineBox"
    >

      <div
        :class="classFilterLineButtons"
      >

        <filter-btn
          :label="resetButton.label"
          :value="resetButton.value"
          :func="resetButton.func"
          :selected="resetButton.selected"
        ></filter-btn>

        <filter-date-btn
          v-for="item of dateButtons"
          :key="item.key"
          :label="item.label"
          :value="item.value"
          :func="item.func"
          :selected="item.selected"
        ></filter-date-btn>

        <filter-btn
          v-for="(item, index) of buttons"
          :key="index"
          :label="item.label"
          :tooltip="item.tooltip"
          :func="item.func"
          :selected="item.selected"
        ></filter-btn>

      </div>
    </div>
  </div>
</template>

<script>
  import FilterBtn from "./FilterBtn";
  import moment from 'moment'
  import pathExists from "jrf-path-exists";
  import FilterDateBtn from "./FilterDateBtn";

  export default {
    name: "FilterSchedule",
    components: {FilterDateBtn, FilterBtn},
    props: {
      filter: {
        type: Object,
        default() {
          return {};
        }
      },
      halls: {
        type: Array,
        default() {
          return [];
        }
      },
      tickets: {
        type: Array,
        default() {
          return [];
        }
      },
      setFilter: Function
    },

    computed: {

      classFilterLine() {
        const isMobile = this.$q.platform.is.mobile;
        return isMobile ? '' : 'q-px-md'
      },
      classFilterLineBox() {
        const isMobile = this.$q.platform.is.mobile;
        return isMobile ? 'filter-line__box_srolled' : 'filter-line__box'
      },
      classFilterLineButtons() {
        const isMobile = this.$q.platform.is.mobile;
        return isMobile ? 'filter-line__buttons_scrolled' : 'filter-line__buttons'
      },

      resetButton() {

        const reset = {
          label: 'X',
          selected: this.$q.dark.isActive,
          func: () => this.resetFilter()
        };

        return reset;

      },

      dateButtons() {

        const buttons = [];

        const dateStart = {
          label: moment(this.filter.dateStart).format('DD.MM'),
          value: this.filter.dateStart,
          selected: true,
          key: 'dateStart',
          func: (date) => this.setDate({date, type: 'dateStart'})
        };
        buttons.push(dateStart);

        const dateEnd = {
          label: moment(this.filter.dateEnd).format('DD.MM'),
          value: this.filter.dateEnd,
          selected: true,
          key: 'dateEnd',
          func: (date) => this.setDate({date, type: 'dateEnd'})
        };
        buttons.push(dateEnd);

        return buttons;

      },

      buttons() {

        const buttons = [];

        for (const hall of this.halls) {

          const hallIds = pathExists(this, 'filter.hallIds', []);
          const id = Number(hall.id);

          const hallBtn = {
            label: hall.name,
            selected: hallIds.includes(id),
            tooltip: hall.description,
            func: () => this.clickHall(id)
          };
          buttons.push(hallBtn);

        }

        for (const ticket of this.tickets) {

          const ticketIds = pathExists(this, 'filter.ticketIds', []);
          const id = Number(ticket.id);

          const ticketBtn = {
            label: ticket.name,
            tooltip: ticket.description,
            selected: ticketIds.includes(id),
            func: () => this.clickTicket(id)
          };
          buttons.push(ticketBtn);

        }

        return buttons;

      },

    },

    methods: {
      clickHall(id) {
        this.processId({id, type: 'hallIds'});
      },
      clickTicket(id) {
        this.processId({id, type: 'ticketIds'});
      },

      setDate({date, type}) {

        const filter = this.copyFilter();//{...this.filter};

        const parts = date.split('/');
        filter[type] = `${parts[0]}-${parts[1]}-${parts[2]}`;

        this.setFilter({filter});

      },

      processId({id, type}) {

        const filter = this.copyFilter();//{...this.filter};

        const index = filter[type].indexOf(id);
        if (index < 0) {
          filter[type].push(id);
        } else {
          filter[type].splice(index, 1);
        }

        this.setFilter({filter});

      },

      resetFilter() {
        this.setFilter({reset: true});
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
    }
  }
</script>

<style lang="sass">
  .filter-line

    &__box
      .filter-line__buttons
      max-width: max-content
      margin: 8px auto 8px auto

    &__box_srolled
      overflow: hidden
      height: 60px

      .filter-line__buttons_scrolled
        white-space: nowrap
        overflow: auto
        width: 100%
        padding: 0 16px 45px 16px
        overflow-y: hidden
        margin-left: 0
        margin-right: 0
</style>
