<template>
  <div id="test-title">test</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gsap } from 'gsap'

export default Vue.extend({
  head() {
    return {
      title: '使途予算別',
    }
  },
  mounted() {
    gsap.to('#test-title', { x: 500, duration: 3 })
  },
})
</script>