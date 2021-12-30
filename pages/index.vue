<template>
  <daily-selection region="つくば市" />
</template>

<script lang="ts">
import Vue from 'vue'
import DailySelection from "~/components/DailySelection.vue";

export default Vue.extend({
  components: { DailySelection },
  head() {
    return {
      title: '使途一日あたり'
    }
  }
})
</script>
