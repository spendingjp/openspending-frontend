<template>
  <div class="container mb-4 mt-3">
    <!-- 世帯種別選択 -->
    <h2 class="title">あなたの世帯タイプは？</h2>
    <div id="select-house-type-box" class="row">
      <div class="col text-center">
        <house-type-selection selected-type="SINGLE" />
      </div>
    </div>
    <!-- 年収選択 -->
    <h2 class="title">あなたの年収は？</h2>
    <income-selector
      :value="sliderValue"
      :min-yearly-income="1000000"
      :max-yearly-income="20000000"
    />
    <h2 class="title">
      あなたの{{
        region
      }}税は、1日当たり、どこで、いくら使われているかの目安です。
    </h2>
    <div class="row mt-4">
      <!-- 個別税額表示 -->
      <div class="col">
        <div id="tax-list-box">
          <!-- 第1レベル -->
          <div id="accordion-level1" class="accordion">
            <div
              v-for="(cofogLevel1Item, i) in taxData"
              :key="i"
              class="accordion-item accordion-box"
            >
              <div class="row">
                <h2 :id="'heading-level1-' + i" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse-level1-' + i"
                    aria-expanded="false"
                    :aria-controls="'collapse-level1-' + i"
                  >
                    <dance-ballroom
                      fill-color="#ddd"
                      :size="80"
                      class="accordion-icon"
                    />
                    <p class="accordion-title col-6 col-lg-10">
                      {{ cofogLevel1Item.name }}
                    </p>

                    <div class="fw-bold fs-3 col-3 col-lg-1">
                      <span class="fs-6 me-1">￥</span
                      >{{ cofogLevel1Item.amount | displayMoney }}
                    </div>
                  </button>
                </h2>
              </div>
              <div
                :id="'collapse-level1-' + i"
                class="accordion-collapse collapse"
                :aria-labelledby="'heading-level1-' + i"
                data-bs-parent="#accordion-level1"
              >
                <!-- 第2レベル -->
                <div id="accordion-level2" class="accordion">
                  <div
                    v-for="(cofogLevel2Item, j) in cofogLevel1Item.children"
                    :key="j"
                    class="accordion-item accordion-box row"
                  >
                    <h2
                      :id="'heading-level2-' + i + '-' + j"
                      class="accordion-header"
                    >
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#collapse-level2-' + i + '-' + j"
                        aria-expanded="false"
                        :aria-controls="'collapse-level2-' + i + '-' + j"
                      >
                        <p class="accordion-title ps-3 col-7 col-lg-10">
                          {{ cofogLevel2Item.name }}
                        </p>
                        <div class="fw-bold col-3 col-lg-1">
                          <span class="small">￥</span>&nbsp;{{
                            cofogLevel2Item.amount | displayMoney
                          }}
                        </div>
                      </button>
                    </h2>
                    <div
                      :id="'collapse-level2-' + i + '-' + j"
                      class="accordion-collapse collapse"
                      :aria-labelledby="'heading-level2-' + i + '-' + j"
                      data-bs-parent="#accordion-level2"
                    >
                      <!-- 第3レベル -->
                      <table class="table table-striped table-hover">
                        <tbody>
                          <tr
                            v-for="(
                              cofogLevel3Item, k
                            ) in cofogLevel2Item.children"
                            :key="k"
                          >
                            <td class="ps-5">{{ cofogLevel3Item.name }}</td>
                            <td class="text-end pe-3 pe-lg-5">
                              ￥&nbsp;{{
                                cofogLevel3Item.amount | displayMoney
                              }}
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DanceBallroom from 'vue-material-design-icons/DanceBallroom.vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import IncomeSelector from '~/components/molecules/IncomeSelector.vue'
import HouseTypeSelection from '@/components/molecules/HouseTypeSelection.vue'
import { DailyBreadItem } from '~/plugins/dataTransferObjects/dailyBreadData'

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
  /**
   * 自治体名
   */
  region: string
}

type PropType = {}

type ComputedType = {
  taxData: DailyBreadItem[]
}

type MethodType = {}

export default Vue.extend({
  components: {
    DanceBallroom,
    HouseTypeSelection,
    IncomeSelector,
  },
  filters: {
    /**
     * 金額を見やすく表示
     * （3桁区切りで表示、小数点以下2桁まで）
     */
    displayMoney: (value: number) => {
      let seisu = String(Number(value.toFixed(2)))
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

      return seisu + syosu
    },
  },
  data(): DataType {
    return {
      selectedType: 'SINGLE',
      yearlyIncome: 4000000,
      yearlyTax: 10000,
      sliderValue: 4000000,
      region: this.$accessor.regionCofogData.regionCofogData.governmentName,
    }
  },
  computed: {
    taxData: {
      get() {
        return [...this.$accessor.dailyBreadData.taxList]
      },
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropType>)
</script>

<style scoped lang="scss">
.title {
  border-bottom: solid 3px $light;
  position: relative;
  color: $info;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 36px 0 16px;
  padding-bottom: 10px;

  &::after {
    position: absolute;
    content: ' ';
    display: block;
    border-bottom: solid 3px $primary;
    bottom: -3px;
    width: 30%;
  }
}

.money {
  font-size: 1.5em;
  font-weight: bold;
}

/* -------------------------------------------------------
 *  個別税額表示
 * ------------------------------------------------------- */
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
  // width: 50vw;
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
</style>
