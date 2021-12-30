<template>
  <div class="box">
    <p class="name">{{name}}</p>
    <slot></slot>
    <p class="tax">{{ tax }}</p>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  props: {
    /**
     * 種別名
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * 税額
     */
    tax: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.box {
  text-align: center;
}

/* 種別名 */
.name {
  font-size: 1.2em;
}

/* 税額 */
.tax {
  font-size: 1.3em;
}
</style>
