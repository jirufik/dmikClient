<template>
  <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
    <q-btn fab outline icon="keyboard_arrow_up" :color="color"></q-btn>
  </q-page-scroller>
</template>

<script>
  export default {
    name: "ScrollUp",
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
