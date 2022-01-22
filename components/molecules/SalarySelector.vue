<template>
  <div>
    <slider v-model="salary" :min="minYearlyIncome" :max="maxYearlyIncome" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Slider from '@/components/atoms/slider.vue'

export default Vue.extend({
  components: {
    Slider,
  },
  props: {
    initialSalary: {
      type: Number,
      default: 4000000,
    },
    minYearlyIncome: {
      type: Number,
      default: 1000000,
    },
    maxYearlyIncome: {
      type: Number,
      default: 20000000,
    },
  },
  data() {
    return {
      salary: 0,
    }
  },
  mounted() {},
  methods: {},
})
</script>

<style lang="scss" scoped>
</style>