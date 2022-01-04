<template>
  <div>
    <input
      :value="value"
      :max="max"
      :min="min"
      step="200000"
      type="range"
      @input="$emit('input', Number($event.target.value))"
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
     * 選択値
     */
    value: {
      type: Number,
      default: 50,
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
  /* border: solid 3px #2E3C8C; */
}
/* つまみ */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: $primary;
  width: 24px;
  height: 24px;
  /* background-image: url('/yen-slider.png'); */
  background-size: cover;
  border-radius: 50%; /* 円形に */
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); /* 影 */
}
</style>