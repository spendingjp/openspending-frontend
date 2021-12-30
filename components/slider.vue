<template>
  <div>
    <input
      :value="value"
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

<style scoped>
/* 横棒 */
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  cursor: all-scroll;
  outline: none; /* スライダーのアウトラインは見た目がキツイので消す */
  height: 5px;
  width: 100%;
  background: #418fe2;
  border-radius: 10px;
  border: solid 3px #dff1ff;
}
/* つまみ */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #2a9cff;
  width: 24px;
  height: 24px;
  background-image: url('/yen-slider.png');
  background-size: cover;
  border-radius: 50%; /* 円形に */
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15); /* 影 */
}
</style>