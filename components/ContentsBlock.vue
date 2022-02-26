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
  position: relative;
  color: $dark;
  margin: 16px 0;
  padding-bottom: 10px;
  border-bottom: solid 3px var(--secondary);

  &::after {
    position: absolute;
    content: ' ';
    display: block;
    border-bottom: solid 3px var(--primary);
    bottom: -3px;
    width: 30%;
  }
}
.content-container {
  margin-left: 5em;
}
</style>
