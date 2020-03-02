<template>
  <q-btn
    :flat="!selected"
    :outline="selected"
    rounded
    color="dark"
    :label="label"
    class="shadow-1 q-ma-xs"
  >
    <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
      <q-date v-model="proxyDate" color="dark">
        <div class="row items-center justify-end q-gutter-sm">
          <q-btn label="Cancel" color="dark" flat v-close-popup></q-btn>
          <q-btn label="OK" color="dark" flat @click="save" v-close-popup></q-btn>
        </div>
      </q-date>
    </q-popup-proxy>
  </q-btn>

</template>

<script>
  import moment from 'moment'

  export default {
    name: "FilterDateBtn",

    props: {
      label: String,
      type: String,
      selected: {
        type: Boolean,
        default: false
      },
      func: Function,
      value: [Number, String, Object]
    },

    data() {
      return {
        date: '2019/03/01',
        proxyDate: '2019/03/01'
      }
    },

    methods: {
      updateProxy() {
        this.proxyDate = moment(this.value).format('YYYY/MM/DD');
      },

      save() {
        this.func(this.proxyDate);
      }
    }

  }
</script>

<style scoped>

</style>
