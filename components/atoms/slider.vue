<template>
  <div>
    <input
      v-model="inputedValue"
      :max="max"
      :min="min"
      :step="step"
      type="range"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    /**
     * 最小値
     */
    min: {
      type: Number,
      default: 0,
    },
    /**
     * 最大値
     */
    max: {
      type: Number,
      default: 100,
    },
    /**
     * 設定間隔
     */
    step: {
      type: Number,
      default: 1,
    },
    /**
     * 選択値
     */
    value: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {}
  },
  computed: {
    inputedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', Number(val))
      },
    },
  },
})
</script>

<style scoped lang='scss'>
/* 横棒 */
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  cursor: all-scroll;
  outline: none; /* スライダーのアウトラインは見た目がキツイので消す */
  height: 10px;
  width: 100%;
  background: $info;
  border-radius: 10px;
}
/* つまみ */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: $primary;
  width: 24px;
  height: 24px;
  background-size: cover;
  border-radius: 50%; /* 円形に */
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); /* 影 */
}
</style>