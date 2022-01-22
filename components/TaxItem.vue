<template>
  <div class="box">
    <p class="tax">{{ tax }}</p>
    <div class="icon">
      <slot></slot>
    </div>
    <span class="name">{{name}}</span>
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
  font-size: 0.8em;
  padding-left: 5px;
}

/* 税額 */
.tax {
  font-size: 1.5em;
  font-weight: bold;
  color: #29B6F6;
}

.icon {
  position: relative;
  top: -50px;
  left: 0px;
  z-index: -1;
}
</style>
