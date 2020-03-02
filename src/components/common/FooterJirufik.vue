<template>
  <div class="footer-jirufik column items-center">
    <div class="row q-px-md">
      Released under the&nbsp
      <a href="https://opensource.org/licenses/MIT"
         style="text-decoration:none;color:#616161;"
         target="_blank"
      >MIT License</a>

      <div>
        <a href="https://rufus.pro"
           style="text-decoration:none;color:#616161;"
           target="_blank"
        ><img src="statics/logoJirufikLight.svg" width="20" height="20"
              style="vertical-align: top; margin: 0 4px;">jirufik
        </a>
      </div>
    </div>
    <div class="row">{{ strFooter }}</div>
  </div>

</template>

<script>
  export default {
    name: "FooterJirufik",
    computed: {
      strFooter() {
        let curYear = new Date().getFullYear();
        return curYear === 2020 ? `Copyright © 2020` : `Copyright © 2020 - ${curYear}`;
      }
    }
  }
</script>

<style lang="sass">
  .footer-jirufik
    min-height: 45px
</style>
