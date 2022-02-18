<template>
  <div class="row align-items-end">
    <!-- スライダー -->
    <div id="display-yearly-income" class="col-12 col-lg-6">
      <div class="d-flex justify-content-between align-items-end">
        <p class="fs-6 m-0">￥</p>
        <p class="fs-1 m-0">￥</p>
      </div>
      <slider
        v-model="sliderValue"
        :min="minYearlyIncome"
        :max="maxYearlyIncome"
        :step="200000"
        :value="sliderValue"
      />
    </div>
    <div class="col-lg-6 flex-column ps-lg-5">
      <div class="row">
        <!-- 年収表示 -->
        <div class="col-12 col-lg-6 align-text-bottom">
          <div class="row">
            <p class="col-6 col-lg-12 mb-0 align-self-center">年収</p>
            <p
              class="
                money
                mb-0
                fs-3
                ps-3
                col-6 col-lg-12
                text-end text-lg-start
              "
            >
              {{ sliderValue | displayMoney }}
            </p>
          </div>
        </div>
        <!-- 税額表示 -->
        <div class="col-12 col-lg-6">
          <div class="row">
            <div class="col-6 col-lg-12">あなたの{{ region }}税（年間）</div>
            <p
              class="
                money
                mb-0
                ps-3
                col-6 col-lg-12
                text-end text-lg-start
                fs-3
              "
            >
              {{ yearlyTax | displayMoney }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Slider from '@/components/atoms/slider.vue'

type DataType = {
  region: string
  sliderValue: number
  timeout: NodeJS.Timeout
  debouncedInput: string
}

export default Vue.extend({
  components: {
    Slider,
  },
  filters: {
    /**
     * 金額を見やすく表示
     * （万、円を表示）
     */
    displayMoney: (value: number) => {
      const str = String(value)
      let res = ''
      for (let i = str.length - 1; i >= 0; i--) {
        if (str.length - i === 5) res += '万'
        res += str[i]
      }
      res = res.split('').reverse().join('')
      res += '円'
      return res
    },
  },
  props: {
    minYearlyIncome: {
      type: Number,
      default: 1000000,
    },
    maxYearlyIncome: {
      type: Number,
      default: 20000000,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data(): DataType {
    return {
      region: this.$accessor.regionCofogData.regionCofogData.governmentName,
      sliderValue: this.value,
      timeout: null,
      debouncedInput: '',
    }
  },
  computed: {
    yearlyTax() {
      return this.$accessor.dailyBreadData.yearlyTax
    },
  },
  watch: {
    sliderValue(newVal) {
      // 税金計算には時間がかかるのでスライダーが遅くなるのを防止
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$accessor.dailyBreadData.setIncome(newVal)
      }, 100)
    },
  },
  mounted() {
    this.$accessor.dailyBreadData.setIncome(this.value)
  },
})
</script>

<style lang="scss" scoped>
.money {
  color: $primary;
  font-size: 1.5em;
  font-weight: bold;
}

/* 年収表示 */
#display-yearly-income {
  text-align: center;
}

/* 年収選択 */
#select-yearly-income {
  text-align: center;
}

/* 税額表示 */
#display-yearly-tax {
  text-align: center;
}
</style>