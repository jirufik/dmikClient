<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {LocalStorage} from 'quasar'

  export default {
    name: 'App',
    created() {
      Vue.prototype.$app = this;
      const darkMode = !!this.$q.localStorage.getItem('darkMode');
      this.$q.dark.set(darkMode);
    },

    data() {
      return {
        title: this.$t('title.poster')
      }
    },

    methods: {
      setTitle(title) {
        this.title = title;
      },
      onDarkMode() {
        this.$q.localStorage.set('darkMode', true);
        this.$q.dark.set(true);
      },
      offDarkMode() {
        this.$q.localStorage.set('darkMode', false);
        this.$q.dark.set(false);
      },
      toggleDarkMode() {
        const darkMode = !this.$q.localStorage.getItem('darkMode');
        this.$q.localStorage.set('darkMode', darkMode);
        this.$q.dark.set(darkMode);
      }
    }
  }
</script>
