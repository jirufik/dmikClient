<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'App',
    created() {
      Vue.prototype.$app = this;
    },

    data() {
      return {
        title: this.$t('title.poster')
      }
    },

    methods: {
      setTitle(title) {
        this.title = title;
      }
    }
  }
</script>
