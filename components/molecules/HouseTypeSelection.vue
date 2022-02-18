<template>
  <div>
    <icon-radio-button
      text="単身世帯"
      :is-checked="selected === 'SINGLE'"
      @click.native="selectHouseType('SINGLE')"
    >
      <HumanHandsdown :size="100" title="単身世帯" />
    </icon-radio-button>
    <icon-radio-button
      text="扶養あり"
      :is-checked="selected === 'FAMILY'"
      @click.native="selectHouseType('FAMILY')"
    >
      <HumanMaleFemaleChild :size="100" title="扶養あり" />
    </icon-radio-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HumanHandsdown from 'vue-material-design-icons/HumanHandsdown.vue'
import HumanMaleFemaleChild from 'vue-material-design-icons/HumanMaleFemaleChild.vue'
import IconRadioButton from '@/components/atoms/IconRadioButton.vue'
import { HOME_TYPE } from '~/plugins/valueObjects/HomeType'

export default Vue.extend({
  components: {
    IconRadioButton,
    HumanHandsdown,
    HumanMaleFemaleChild,
  },
  props: {
    selectedType: {
      type: String,
      default: HOME_TYPE.SINGLE,
    },
  },
  data() {
    return {
      selected: 'SINGLE',
    }
  },
  mounted() {
    this.selectHouseType(this.$props.selectedType)
  },
  methods: {
    /**
     * 世帯種別を選択する
     * @param {String} 世帯種別(single / family)
     */
    selectHouseType(type: string) {
      if (type !== 'SINGLE' && type !== 'FAMILY') {
        throw new Error('世帯種別が異常:' + type)
      }
      this.$emit('selectd-value', type)
      this.$accessor.dailyBreadData.setHouseType(type)
      this.selected = type
    },
  },
})
</script>

<style lang="scss" scoped>
</style>