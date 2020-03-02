<template>
  <div class="flex-inline no-wrap q-ma-sm q-gutter-sm">
    <filter-btn
      v-for="(item, index) of filter"
      :key="index"
      :label="item.label"
      :func="item.func"
      :selected="item.selected"
    ></filter-btn>
  </div>
</template>

<script>
  import FilterBtn from "./FilterBtn";

  export default {
    name: "FilterLine",
    props: {
      filter: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      FilterBtn
    }
  }
</script>

<style lang="sass">

</style>
