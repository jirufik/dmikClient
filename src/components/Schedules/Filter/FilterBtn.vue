<template>
  <q-btn
    :flat="!selected"
    :outline="selected"
    rounded
    :color="color"
    :label="label"
    @click="func"
    class="shadow-1 q-ma-xs"
  >
    <q-tooltip v-if="tooltip">{{tooltip}}</q-tooltip>
  </q-btn>
</template>

<script>
  export default {
    name: "FilterBtn",

    props: {
      label: String,
      tooltip: String,
      selected: {
        type: Boolean,
        default: false
      },
      func: Function
    },
    computed: {
      isDarkMode() {
        return this.$q.dark.isActive;
      },
      color() {
        return this.isDarkMode ? 'white' : 'dark';
      }
    },

  }
</script>

<style scoped>

</style>
