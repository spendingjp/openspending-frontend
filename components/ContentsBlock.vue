<template>
  <section class="content">
    <h2 v-if="title" class="content-title fs-5">{{ title }}</h2>
    <div class="content-container">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
.content {
  margin-bottom: 50px;
}
.content-title {
  margin: 16px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid $primary;
}
.content-container {
  margin-left: 5em;
}
</style>
