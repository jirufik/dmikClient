<template>
  <div class="cursor-pointer" @click="toggleShow">
    <span>{{getText}}</span>
    <span v-if="showLabel" class="text-primary">
      {{getLabel}}
    </span>
  </div>
</template>

<script>
  export default {
    name: "MoreText",
    props: {
      text: String,
      maxLen: {
        type: Number,
        default: 100
      },
      textShow: {
        type: String,
        default: ' показать...'
      },
      textHide: {
        type: String,
        default: ' скрыть.'
      }
    },
    data() {
      return {
        showText: false
      }
    },
    computed: {
      showLabel() {
        return this.text.length > this.maxLen;
      },
      getText() {
        return this.showText ? this.text : this.text.slice(0, this.maxLen);
      },
      getLabel() {
        return this.showText ? this.textHide : this.textShow;
      }
    },
    methods: {
      toggleShow() {
        this.showText = !this.showText;
      }
    }
  }
</script>

<style scoped>

</style>
