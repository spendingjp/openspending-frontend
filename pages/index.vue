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
})
</script>
