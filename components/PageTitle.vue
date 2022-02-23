<template>
  <h1 class="page-title fs-3">{{ title }}</h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.page-title {
  position: relative;
  margin: 20px 0 60px;
  padding-bottom: 10px;

  &::after {
    position: absolute;
    content: ' ';
    display: block;
    border-bottom: 5px solid $primary;
    bottom: -3px;
    width: 50px;
  }
}
</style>
