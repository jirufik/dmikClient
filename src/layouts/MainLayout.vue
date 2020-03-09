<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar :class="classToolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          {{$app.title}}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list bordered separator>
        <q-item to="/" exact>
          <q-item-section>
            <q-item-label>{{$t('title.poster')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/films" exact>
          <q-item-section>
            <q-item-label>{{$t('title.films')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/schedules" exact>
          <q-item-section>
            <q-item-label>{{$t('title.schedule')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about" exact>
          <q-item-section>
            <q-item-label>{{$t('title.about')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-toggle
              class="justify-between"
              :value="isDarkMode"
              :label="labelMode"
              left-label
              :color="color"
              @input="toggleDarkMode"
            ></q-toggle>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    name: 'MainLayout',

    components: {},

    data() {
      return {
        leftDrawerOpen: false,
        essentialLinks: [
          {
            title: 'Афиша',
            caption: 'quasar.dev',
            icon: 'school',
            to: '/'
          },
          {
            title: 'Фильмы',
            caption: 'github.com/quasarframework',
            icon: 'code',
            to: '/films'
          }
        ]
      }
    },

    computed: {
      isDarkMode() {
        return this.$q.dark.isActive;
      },
      color() {
        return this.isDarkMode ? 'white' : 'dark';
      },
      labelMode() {
        return this.$t(this.isDarkMode ? 'lightMode' : 'darkMode');
      },
      classToolbar() {
        return this.isDarkMode ? 'bg-dark text-white' : 'bg-white text-black';
      }
    },

    methods: {
      toggleDarkMode() {
        this.$app.toggleDarkMode();
      }
    }

  }
</script>
