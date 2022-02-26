<template>
  <div>
    <Header />

    <Nuxt />

    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      defaultPrimary: '#BF9D73',
      defaultSecondary: '#4369D9',
    }
  },
  mounted() {
    const primary = this.$store.state.regionCofogData.primaryColorCode ?? this.defaultPrimary
    const secondary = this.$store.state.regionCofogData.secondaryColorCode ?? this.defaultSecondary
    document.documentElement.setAttribute('style', `--color-primary: ${primary}; --color-secondary: ${secondary};`);
  }
})
</script>

<style>
</style>
