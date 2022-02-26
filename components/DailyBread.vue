<template>
  <div>
    <!-- 世帯種別選択 -->
    <section class="section">
      <h2 class="title">あなたの世帯タイプは？</h2>
      <div id="select-house-type-box" class="row">
        <div class="col text-center">
          <house-type-selection selected-type="SINGLE" />
        </div>
      </div>
    </section>
    <!-- 年収選択 -->
    <section class="section">
      <h2 class="title">あなたの年収は？</h2>
      <income-selector
        :value="sliderValue"
        :min-yearly-income="1000000"
        :max-yearly-income="20000000"
      />
    </section>
    <section class="section">
      <h2 class="title">
        あなたの{{
          region
        }}税は、1日当たり、どこで、いくら使われているかの目安です。
      </h2>
      <div class="row">
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
                <div>
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse-level1-' + i"
                    aria-expanded="false"
                    :aria-controls="'collapse-level1-' + i"
                  >
                    <span :id="'heading-level1-' + i" class="accordion-button-inner">
                      <span class="accordion-icon">
                        <img :src="`${iconUrl}/${cofogLevel1Item.iconId}`" alt="" width="60" />
                      </span>
                      <span class="accordion-title">
                        {{ cofogLevel1Item.name }}
                      </span>
                      <span class="accordion-amount fw-bold fs-3">
                        <span class="fs-6 me-1">￥</span
                        >{{ cofogLevel1Item.amount | displayMoney }}
                      </span>
                    </span>
                  </button>
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
                      class="accordion-item accordion-box"
                    >
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#collapse-level2-' + i + '-' + j"
                        aria-expanded="false"
                        :aria-controls="'collapse-level2-' + i + '-' + j"
                      >
                        <span
                          :id="'heading-level2-' + i + '-' + j"
                          class="accordion-button-inner"
                        >
                          <span class="accordion-icon icon-level2">
                            <img :src="`${iconUrl}/${cofogLevel2Item.iconId}`" alt="" width="40" />
                          </span>
                          <span class="accordion-title ps-3">
                            {{ cofogLevel2Item.name }}
                          </span>
                          <span class="accordion-amount">
                            <span class="small">￥</span>&nbsp;{{
                              cofogLevel2Item.amount | displayMoney
                            }}
                          </span>
                        </span>
                      </button>
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
                              <td class="accordion-icon-wrap">
                                <span class="accordion-icon icon-level3">
                                  <img :src="`${iconUrl}/${cofogLevel3Item.iconId}`" alt="" width="30" />
                                </span>
                              </td>
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
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
  /**
   * アイコン画像のパス
   */
  iconUrl: string
}

type PropType = {}

type ComputedType = {
  taxData: DailyBreadItem[]
}

type MethodType = {}

export default Vue.extend({
  components: {
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
      iconUrl: `${this.$config.apiUrl}icons`,
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
.section {
  margin-bottom: 60px;
  padding-bottom: 30px;
}

.title {
  border-bottom: solid 3px $light;
  position: relative;
  color: $info;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 16px 0;
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

.accordion-button {
  padding: 10px;
}

.accordion-button-inner {
  display: flex;
  align-items: center;
  width: 100%;
}

.accordion-item {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: #0f1640 solid 1px;
}

.accordion-title {
  position: relative;
  flex: 1 0 50%;
  margin-left: 30px;
  margin-right: 15px;
}

.accordion-amount {
  flex: 0 0 25%;
  font-weight: bold;
}

.accordion-icon-wrap {
  position: relative;
}

.accordion-icon {
  position: absolute;
  display: inline-block;
  opacity: 0.25;
  top: -5px;
  left: -5px;
}

.icon-level2 {
  top: 3px;
  left: 15px;
}

.icon-level3 {
  top: 5px;
  left: 35px;
}

.accordion-box {
  display: block;
  position: relative;
  overflow: hidden;
}
</style>
