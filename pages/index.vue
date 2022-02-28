<template>
  <div class="container my-4">
    <page-title title="使途一日あたり" />
    <daily-selection />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DailySelection from '~/components/DailyBread.vue'
import PageTitle from '@/components/PageTitle.vue'

export default Vue.extend({
  components: { DailySelection, PageTitle },
  head() {
    return {
      title: '使途一日あたり',
    }
  },
  async beforeMount() {
    // execute only on client side.
    // TODO: move to middleware
    const hostname = window.location.hostname
    try {
      this.$accessor.regionCofogData.setHostname(hostname)
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.error('Error on beforeMount: ', err)
        this.$router.push({
          path: '404.html',
        })
        return
      }
    }

    try {
      await this.$accessor.regionCofogData.fetchBudgetListAndWdmmgData()
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.error('Error on beforeMount: ', err)
        this.$router.push({
          path: '404.html',
        })
      }
    }
  },
})
</script>
