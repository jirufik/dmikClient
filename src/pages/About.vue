<template>
  <q-page class="flex about-project">

    <div class="col q-pt-md about-project__content">

      <div class="q-pa-md text-h4 text-center">Костафиша</div>

      <div class="q-pa-md text-body1">
        В городе Костомукша есть кинозал, у кинозала есть официальный сайт
        <a href="http://www.dmik.ru" target="_blank">dmik.ru</a>
        который не совсем удобен в использовании на современных устройствах.
        Таким образом родилась идея создать данный проект, размять мозги и пальцы рук :)
      </div>

      <q-separator></q-separator>

      <div class="q-pa-md text-body1">Проект состоит из трех сервисов:</div>

      <div class="q-pa-md text-body2">
        <span class="text-weight-bold"><a href="https://github.com/jirufik/dmikParser"
                                          target="_blank">dmikParser</a></span> - Парсит основой источник данных <a
        href="http://www.dmik.ru"
        target="_blank">dmik</a>.
        В ходе разработки выяснилось что информации не достаточно, особенно в виде изображений в большем разрешении.
        Значит надо искать дополнительный источник информаци. Идем на <a href="https://www.kinopoisk.ru/"
                                                                         target="_blank">КиноПоиск</a> и понимаем API
        закрыт. В результате находим <a href="https://www.themoviedb.org/" target="_blank">TMDb</a> который обладает
        открытым API, с которого в результате и черпается недостаток информации. В будущем, если будет время и удастся
        перебороть лень, то попробую провести реверс инжиниринг API КиноПоиска.
      </div>

      <div class="q-pa-md text-body2">
        <span class="text-weight-bold"><a href="https://github.com/jirufik/dmikBackend"
                                          target="_blank">dmikBackend</a></span> - Backend сервис, который крутится на
        серваке где-то в дата
        центре посреди Хельсинки. Передает предоставленную парсером инфу Клиенту запущенному в браузере, на устройстве
        пользователя.
      </div>

      <div class="q-pa-md text-body2">
        <span class="text-weight-bold"><a href="https://github.com/jirufik/dmikClient"
                                          target="_blank">dmikClient</a></span> - Frontend сервис, который в
        браузере пользователя и предоставляет инфу с Backend сервиса, в доступном виде.
      </div>

      <q-separator></q-separator>

      <div class="q-pa-md text-body1">Проект разработан <span class="text-weight-bold">Studio Vedropolis</span> &
        <span class="text-weight-bold">Jirufik programmers team</span>.
      </div>

      <div class="q-px-md text-body1">
        <span class="text-grey-8">Director</span> - Jirufik
      </div>
      <div class="q-px-md text-body1">
        <span class="text-grey-8">Backend programmer</span> - Eugeniy programmist
      </div>
      <div class="q-px-md text-body1">
        <span class="text-grey-8">Frontend programmer</span> - Rufus
      </div>

      <div class="column items-center">
        <q-img
          class="rounded-borders q-ma-md"
          src="statics/vedropolis.png"
        ></q-img>
        <q-img
          style="max-width: 300px"
          class="q-ma-md"
          src="statics/Jirufik7_300.png"
        ></q-img>
      </div>

      <div class="q-pa-md">Если замечен какой либо баг или есть замечание, то можно написать по адресу
        <span class="text-primary">rufus57@yandex.ru</span> в теме написать Костафиша.
      </div>

      <footer-jirufik></footer-jirufik>

    </div>

    <scroll-up></scroll-up>

  </q-page>
</template>

<script>
  import FooterJirufik from "../components/common/FooterJirufik";
  import ScrollUp from "../components/common/ScrollUp";

  export default {
    name: "About",
    components: {ScrollUp, FooterJirufik},
    created() {
      this.$app.setTitle(this.$t('title.about'));
    }
  }
</script>

<style lang="sass">
  .about-project
    .about-project__content
      max-width: 800px
      margin-right: auto
      margin-left: auto


</style>
