<template>
  <q-btn
    :flat="!selected"
    :outline="selected"
    rounded
    color="dark"
    :label="label"
    @click="func"
    class="shadow-1 q-ma-xs"
  ></q-btn>
</template>

<script>
  export default {
    name: "FilterBtn",
    props: {
      label: String,
      selected: {
        type: Boolean,
        default: false
      },
      func: Function
    }
  }
</script>

<style scoped>

</style>
