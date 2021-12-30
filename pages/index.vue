<template>
  <daily-selection region="つくば市" />
</template>

<script lang="ts">
import Header from "@/components/header.vue"; // headerをインポート
import Vue from 'vue'
import DailySelection from "~/components/DailySelection.vue";

export default Vue.extend({
  components: { DailySelection },})
</script>
