<template>
  <div
    v-if="show"
    style="margin: auto"
    class="q-ma-md"
  >
    <q-card class="q-mb-md q-ml-md q-mr-md">
      <q-card-section class="text-center">
        <q-icon
          size="100px"
          name="la la-video-slash"
        ></q-icon>
        <div class="text-h5">{{text}}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
    props: {
      show: Boolean,
      text: String
    }
  }
</script>

<style scoped>

</style>
