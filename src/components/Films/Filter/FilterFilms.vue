<template>
  <div class="filter-line">
    <div
      :class="classFilterLineBox"
    >

      <div
        :class="classFilterLineButtons"
      >

        <filter-btn
          v-for="(item, index) of buttons"
          :key="index"
          :label="item.label"
          :func="item.func"
          :selected="item.selected"
        ></filter-btn>

      </div>

    </div>
  </div>
</template>

<script>
  import FilterBtn from "./FilterBtn";

  export default {
    name: "FilterFilms",

    props: {
      filter: {
        type: Object,
        default() {
          return {};
        }
      },
      ages: {
        type: Array,
        default() {
          return [];
        }
      },
      setFilter: Function
    },

    computed: {

      classFilterLineBox() {
        const isMobile = this.$q.platform.is.mobile;
        return isMobile ? 'filter-line__box_srolled' : 'filter-line__box'
      },
      classFilterLineButtons() {
        const isMobile = this.$q.platform.is.mobile;
        return isMobile ? 'filter-line__buttons_scrolled' : 'filter-line__buttons'
      },

      buttons() {

        const buttons = [];

        const reset = {
          label: 'X',
          selected: false,
          func: () => this.resetFilter()
        };
        buttons.push(reset);

        const rental = {
          label: this.$t('rental'),
          selected: this.filter.rental,
          func: () => this.setRental()
        };
        buttons.push(rental);

        const soon = {
          label: this.$t('soon'),
          selected: this.filter.soon,
          func: () => this.setSoon()
        };
        buttons.push(soon);

        for (const age of this.ages) {

          const val = age.age;
          const button = {
            label: `${val} +`,
            selected: val <= this.filter.age,
            func: () => {
              this.setAge(val);
            }
          };

          buttons.push(button);

        }

        return buttons;

      }

    },

    methods: {

      setAge(age) {

        const filter = {...this.filter};
        filter.age = age;

        this.setFilter({filter});

      },

      setSoon() {

        const filter = {...this.filter};
        filter.soon = !filter.soon;

        this.setFilter({filter});

      },

      setRental() {

        const filter = {...this.filter};
        filter.rental = !filter.rental;

        this.setFilter({filter});

      },

      resetFilter() {
        this.setFilter({reset: true});
      }

    },

    components: {
      FilterBtn
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
