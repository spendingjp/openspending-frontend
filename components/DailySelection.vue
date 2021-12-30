<template>
  <div>
    <!-- 世帯種別選択 -->
    <div id="select-house-type-box">
      <div class="house-type-box">
        <human-handsdown
          :fill-color="
            selectedType == 'single' ? selectedStyle.color : unSelectedStyle.color
          "
          :size="150"
          title="単身世帯"
          @click="selectHouseType('single')"
        />
        <p :style="selectedType == 'single' ? selectedStyle : unSelectedStyle">単身世帯</p>
      </div>
      <div class="house-type-box">
        <human-male-female-child
          :fill-color="
            selectedType == 'family' ? selectedStyle.color : unSelectedStyle.color
          "
          :size="150"
          title="扶養あり"
          @click="selectHouseType('family')"
        />
        <p :style="selectedType == 'family' ? selectedStyle : unSelectedStyle">扶養あり</p>
      </div>
    </div>
    <!-- 年収選択 -->
    <div id="income-select-box">
      <div id="display-yearly-income">
        <p>年収</p>
        <p class="money">{{ yearlyIncome | displayMoney }}</p>
      </div>
      <div id="select-yearly-income">
        <p>あなたの年間収入を選択してください</p>
        <!-- TODO:スライダー表示 -->
      </div>
      <div id="display-yearly-tax">
        <p>あなたの{{ region }}税（年間）</p>
        <p class="money">{{ yearlyTax | displayMoney }}</p>
      </div>
    </div>
    <!-- 個別税額表示 -->
    <div>
      あなたの{{
        region
      }}税は、1日当たり、どこで、いくら使われているかの目安です。
      <div id="tax-list-box">
        <div class="tax-item">
          <tax-item
            :tax="recreationTax | displayMoney"
            name="レクリエーション・文化活動の支援"
          >
            <dance-ballroom :size="100" />
          </tax-item>
        </div>
        <div class="tax-item">
          <tax-item :tax="safetyTax | displayMoney" name="安心・安全の確保">
            <hospital-box :size="100" />
          </tax-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HumanHandsdown from 'vue-material-design-icons/HumanHandsdown.vue'
import HumanMaleFemaleChild from 'vue-material-design-icons/HumanMaleFemaleChild.vue'
import DanceBallroom from 'vue-material-design-icons/DanceBallroom.vue'
import HospitalBox from 'vue-material-design-icons/HospitalBox.vue'
import TaxItem from './TaxItem.vue'

export type DataType = {
  /**
   * 単身世帯 or 扶養あり
   */
  selectedType: 'single' | 'family'
  /**
   * 年収
   */
  yearlyIncome: Number
  /**
   * 年間の税金
   */
  yearlyTax: Number
  /**
   * スライダーで選択した値
   */
  sliderValue: Number

  recreationTax: Number

  safetyTax: Number
  /**
   * 選択可能な最低年収
   */
  minYearlyIncome: number

  selectedStyle: object
  unSelectedStyle: object
}

export default Vue.extend({
  components: {
    HumanHandsdown,
    HumanMaleFemaleChild,
    DanceBallroom,
    HospitalBox,
    TaxItem,
  },
  filters: {
    /**
     * 金額を見やすく表示（接頭辞に円マーク、3桁区切りで表示）
     */
    displayMoney: (value: Number) => {
      return '￥' + value
    },
  },
  props: {
    /**
     * 表示対象地域名
     */
    region: {
      type: String,
      required: true,
    },
  },
  data(): DataType {
    return {
      selectedType: 'single',
      yearlyIncome: 1000000,
      yearlyTax: 10000,
      recreationTax: 10.11,
      safetyTax: 20.13,
      sliderValue: 10,
      minYearlyIncome: 1000000,
      selectedStyle: {
        color: '#29B6F6',
        "font-weight": "bold"
      },
      unSelectedStyle: {
        color: '#B0BEC5'
      }
    }
  },
  watch: {
    sliderValue(newValue: number, _) {
      // TODO:税額更新
      this.yearlyIncome = this.minYearlyIncome + 100000 * newValue
    },
  },
  methods: {
    /**
     * 世帯種別を選択する
     * @param {String} 世帯種別(single / family)
     */
    selectHouseType(type: string) {
      if (type !== 'single' && type !== 'family') {
        throw new Error('世帯種別が異常:' + type)
      }
      this.selectedType = type
    },
  },
})
</script>

<style scoped>
/* -------------------------------------------------------
 *  世帯種別選択
 * ------------------------------------------------------- */
#select-house-type-box {
  display: flex;
  justify-content: center;
}

.house-type-box {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.house-type-box p {
  font-size: 1.3em;
}

.money {
  font-size: 1.5em;
  font-weight: bold;
}

/* -------------------------------------------------------
 *  年収選択
 * ------------------------------------------------------- */
#income-select-box {
  display: flex;
}

/* 年収表示 */
#display-yearly-income {
  text-align: center;
}

/* 年収選択 */
#select-yearly-income {
  text-align: center;
  flex-grow: 1;
}

/* 税額表示 */
#display-yearly-tax {
  text-align: center;
}

/* -------------------------------------------------------
 *  個別税額表示
 * ------------------------------------------------------- */
#tax-list-box {
  display: flex;
  align-items: flex-end;
}

.tax-item {
  width: 100px;
  vertical-align: bottom;
}
</style>
