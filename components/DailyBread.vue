<template>
  <div class="container mb-4 mt-3">
    <!-- 世帯種別選択 -->
    <div class="row mb-3">
      <div class="col">
        <h3>あなたの世帯タイプは？</h3>
      </div>
    </div>
    <div id="select-house-type-box" class="row">
      <div class="col text-center">
        <house-type-selection
          selected-type="SINGLE"
          @selectd-value="selectHouseType"
        />
      </div>
      <!-- <div class="col-6 text-end">
        <button
          type="button"
          :class="
            (selectedType == 'SINGLE' ? 'checked' : 'unchecked') +
            ' btn btn-block'
          "
          data-bs-toggle="button"
          @click="selectHouseType('SINGLE')"
        >
          <human-handsdown
            :fill-color="
              selectedType == 'SINGLE'
                ? selectedStyle.color
                : unSelectedStyle.color
            "
            :size="100"
            title="単身世帯"
          />
          <p
            class="mb-0"
            :style="selectedType == 'SINGLE' ? selectedStyle : unSelectedStyle"
          >
            単身世帯
          </p>
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          :class="(selectedType == 'FAMILY' ? 'checked' : 'unchecked') + ' btn'"
          data-bs-toggle="button"
          @click="selectHouseType('FAMILY')"
        >
          <human-male-female-child
            :fill-color="
              selectedType == 'FAMILY'
                ? selectedStyle.color
                : unSelectedStyle.color
            "
            :size="100"
            title="扶養あり"
          />
          <p
            class="mb-0"
            :style="selectedType == 'FAMILY' ? selectedStyle : unSelectedStyle"
          >
            扶養あり
          </p>
        </button>
      </div> -->
    </div>
    <!-- 年収選択 -->
    <div class="row mt-4">
      <div class="col">
        <h3>あなたの年収は？</h3>
      </div>
    </div>
    <div class="row mt-4">
      <!-- <SalarySelector :initial-salary="4000000" /> -->
      <div
        id="display-yearly-income"
        class="col-12 col-lg-3 order-lg-0 order-1"
      >
        <div class="row">
          <p
            class="money mb-0 col-8 order-1 text-end"
            :style="'color:' + selectedStyle.color"
          >
            {{ yearlyIncome | displayMoney }}
          </p>
          <p class="small col-4 order-0 mb-0 align-self-center text-end">
            年収
          </p>
        </div>
      </div>
      <div id="select-yearly-income" class="col-12 col-lg-6 order-lg-1 order-0">
        <slider
          v-model="sliderValue"
          :min="minYearlyIncome"
          :max="maxYearlyIncome"
        />
      </div>
      <div
        id="display-yearly-tax"
        class="col-12 col-lg-3 order-lg-2 order-2 mt-2 mt-lg-0"
      >
        <div class="row">
          <p
            class="money mb-0 col-7 order-1 text-end"
            :style="'color:' + selectedStyle.color"
          >
            {{ yearlyTax | displayMoney }}
          </p>
          <span class="small col-5 order-0 mb-0 align-self-center text-end"
            >あなたの{{ region }}税（年間）</span
          >
        </div>
      </div>
    </div>
    <div class="row mt-5 mb-3">
      <div class="col">
        <h3>
          あなたの{{
            region
          }}税は、1日当たり、どこで、いくら使われているかの目安です。
        </h3>
      </div>
    </div>
    <div class="row mt-4">
      <!-- 個別税額表示 -->
      <div class="col">
        <div id="tax-list-box">
          <!-- <div class="tax-item">
            <tax-item
              :tax="recreationTax | displayMoney"
              name="レクリエーション・文化活動の支援"
            >
              <dance-ballroom :size="50" :fill-color="unSelectedStyle.color" />
            </tax-item>
          </div>
          <div class="tax-item">
            <tax-item :tax="safetyTax | displayMoney" name="安心・安全の確保">
              <hospital-box :size="50" fill-color="#ddd" />
            </tax-item>
          </div> -->
          <div class="accordion" id="accordionExample">
            <div
              v-for="(taxCategory, index) in taxData.taxList"
              :key="index"
              class="accordion-item accordion-box"
            >
              <h2 class="accordion-header" :id="'heading' + index">
                <button
                  :class="[
                    index === 0
                      ? 'accordion-button'
                      : 'accordion-button collapsed',
                  ]"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapse' + index"
                  aria-expanded="false"
                  :aria-controls="'collapse' + index"
                >
                  <dance-ballroom
                    fill-color="#ddd"
                    :size="80"
                    class="accordion-icon"
                  />
                  <p class="accordion-title">
                    {{ taxCategory.name }}
                  </p>

                  <div class="fw-bold fs-3">
                    {{ taxCategory.amount | displayMoney }}
                  </div>
                </button>
              </h2>
              <div
                :id="'collapse' + index"
                :class="[
                  index === 0
                    ? 'accordion-collapse collapse show'
                    : 'accordion-collapse collapse',
                ]"
                :aria-labelledby="'heading' + index"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body p-0">
                  <table class="table table-striped">
                    <tbody>
                      <tr
                        v-for="(taxSubCategory, j) in taxCategory.children"
                        :key="j"
                      >
                        <td><dance-ballroom :size="30" /></td>
                        <td>{{ taxSubCategory.name }}</td>
                        <td>
                          {{ taxSubCategory.amount | displayMoney }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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
import SalarySelector from '@/components/molecules/SalarySelector.vue'
import Slider from '@/components/atoms/slider.vue'
import HouseTypeSelection from '@/components/molecules/HouseTypeSelection.vue'
import { TaxApplicationService } from '~/plugins/applicationServices/TaxApplicationService'
import { Person } from '~/plugins/entities/Person'
import { Price } from '~/plugins/valueObjects/Price'
import { HOME_TYPE } from '~/plugins/valueObjects/HomeType'
import { DailyBread } from '~/plugins/dataTransferObjects/dailyBreadData'

export type DataType = {
  /**
   * 単身世帯 or 扶養あり
   */
  selectedType: 'SINGLE' | 'FAMILY'
  /**
   * 年収
   */
  yearlyIncome: number
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
  /**
   * 選択可能な最高年収
   */
  maxYearlyIncome: number

  selectedStyle: object
  unSelectedStyle: object

  taxData: DailyBread
}

export default Vue.extend({
  components: {
    SalarySelector,
    DanceBallroom,
    Slider,
    HouseTypeSelection,
  },
  filters: {
    /**
     * 金額を見やすく表示
     * （接頭辞に円マーク、3桁区切りで表示、小数点以下2桁まで）
     */
    displayMoney: (value: number) => {
      let seisu = String(parseFloat(value.toFixed(2)))
      let syosu = ''
      if (seisu.indexOf('.') > 0) {
        syosu = '.' + seisu.split('.')[1]
        seisu = seisu.replace(syosu, '')
      }
      let i = 0
      seisu = seisu
        .split('')
        .reverse()
        .map((str) => {
          if (++i % 3 === 0 && seisu.length !== i) {
            return ',' + str
          }
          return str
        })
        .reverse()
        .join('')

      return '￥ ' + seisu + syosu
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
      selectedType: 'SINGLE',
      yearlyIncome: 4000000,
      yearlyTax: 10000,
      recreationTax: 1110.11,
      safetyTax: 20.13,
      sliderValue: 4000000,
      minYearlyIncome: 1000000,
      maxYearlyIncome: 20000000,
      selectedStyle: {
        color: '#BF9D73',
        'font-weight': 'bold',
      },
      unSelectedStyle: {
        color: '#B0BEC5',
      },
      taxData: {
        amount: 1000000,
        taxList: [
          // {
          //   amount: 10000,
          //   name: 'カテゴリ1',
          //   cofogCode: '1.1.1',
          //   children: [
          //     {
          //       amount: 10.11,
          //       name: 'サブカテゴリ1',
          //       cofogCode: '1.1.1',
          //     },
          //     {
          //       amount: 56.1,
          //       name: 'サブカテゴリ2',
          //       cofogCode: '1.1.1',
          //     },
          //     {
          //       amount: 22.4,
          //       name: 'サブカテゴリ3',
          //       cofogCode: '1.1.1',
          //     },
          //   ],
          // },
          // {
          //   amount: 30.2,
          //   name: 'カテゴリ2',
          //   cofogCode: '1.1.1',
          //   children: [
          //     {
          //       amount: 90.09,
          //       name: 'サブカテゴリ1',
          //       cofogCode: '1.1.1',
          //     },
          //     {
          //       amount: 34.2,
          //       name: 'サブカテゴリ2',
          //       cofogCode: '1.1.1',
          //     },
          //     {
          //       amount: 23.6,
          //       name: 'サブカテゴリ3',
          //       cofogCode: '1.1.1',
          //     },
          //   ],
          // },
        ],
      },
    }
  },

  watch: {
    sliderValue(newValue: number, _) {
      this.yearlyIncome = newValue
      this.updateTax()
    },
  },
  created() {
    // console.log(this.$repositories('cofog').get())
    // const service = new CofogService(this.$nuxt)
    // service.GetData()
    // console.log(this.$accessor.regionCofogData.regionCofogData)
    // console.log(this.$repositories('cofog').Get())
    // console.log(this.$nuxt.$store)
    this.updateTax()
  },
  methods: {
    /**
     * 世帯種別を選択する
     * @param {String} 世帯種別(SINGLE / FAMILY)
     */
    selectHouseType(type: string) {
      if (type !== 'SINGLE' && type !== 'FAMILY') {
        throw new Error('世帯種別が異常:' + type)
      }
      this.selectedType = type
      this.updateTax()
    },
    updateTax() {
      const appService = new TaxApplicationService(this.$nuxt)
      const person = new Person({
        salary: Price.create(this.yearlyIncome),
        homeType:
          this.selectedType === 'SINGLE' ? HOME_TYPE.SINGLE : HOME_TYPE.FAMILY,
      })
      const tax = appService.GetDailyBreadData(person)
      this.yearlyTax = tax.amount
      this.taxData.taxList.splice(0)
      this.taxData.taxList.push(...tax.taxList)

      // console.log(this.taxData)
    },
  },
})
</script>

<style scoped lang="scss">
h3 {
  border-bottom: solid 3px #359af2;
  position: relative;
  color: #2e3c8c;
  font-weight: bold;
}

h3:after {
  position: absolute;
  content: ' ';
  display: block;
  border-bottom: solid 3px #bf9d73;
  bottom: -3px;
  width: 30%;
}

/* -------------------------------------------------------
 *  世帯種別選択
 * ------------------------------------------------------- */
.house-type-box p {
  font-size: 1.3em;
}

#select-house-type-box button {
  border: 2px solid #bf9d73;
  border-bottom: 5px solid #bf9d73;
  margin: 0 10px;
}

#select-house-type-box button.checked {
  margin-top: 3px;
  border-bottom: 2px solid #bf9d73;
}

#select-house-type-box button.unchecked {
  border: 2px solid gray;
  border-bottom: 5px solid gray;
}

#select-house-type-box button:hover {
  margin-top: 3px;
  border: 2px solid $primary;
  border-bottom: 2px solid $primary;
}

.money {
  font-size: 1.5em;
  font-weight: bold;
}

/* -------------------------------------------------------
 *  年収選択
 * ------------------------------------------------------- */
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

/* -------------------------------------------------------
 *  個別税額表示
 * ------------------------------------------------------- */
#tax-list-box {
}

.tax-item {
  width: 100px;
  vertical-align: bottom;
}

.accordion-item {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: #0f1640 solid 1px;
}

.accordion-title {
  position: relative;
  display: inline-block;
  top: 0;
  left: 0;
  width: 40vw;
  margin-bottom: 0;
  margin-right: 15px;
}

.accordion-icon {
  position: absolute;
  display: inline-block;
  opacity: 0.3;
  top: -10%;
  left: -10px;
}

.accordion-box {
  display: block;
  position: relative;
  overflow: hidden;
}

/* Color Theme Swatches in Hex */
.Moonie-—-Go-to-sleep-happy-and-relaxed-1-hex {
  color: #0f1640;
}
.Moonie-—-Go-to-sleep-happy-and-relaxed-2-hex {
  color: #2e3c8c;
}
.Moonie-—-Go-to-sleep-happy-and-relaxed-3-hex {
  color: #4369d9;
}
.Moonie-—-Go-to-sleep-happy-and-relaxed-4-hex {
  color: #359af2;
}
.Moonie-—-Go-to-sleep-happy-and-relaxed-5-hex {
  color: #bf9d73;
}
</style>
