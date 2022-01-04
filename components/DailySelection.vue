<template>
  <div class="container mb-4 mt-3">
    <!-- 世帯種別選択 -->
    <div class="row mb-3">
      <div class="col">
        <h3>あなたの世帯タイプは？</h3>
      </div>
    </div>
    <div id="select-house-type-box" class="row">
      <div class="col-6 text-end">
        <button
          type="button"
          :class="
            (selectedType == 'single' ? 'checked' : 'unchecked') +
            ' btn btn-block'
          "
          data-bs-toggle="button"
          @click="selectHouseType('single')"
        >
          <human-handsdown
            :fill-color="
              selectedType == 'single'
                ? selectedStyle.color
                : unSelectedStyle.color
            "
            :size="100"
            title="単身世帯"
          />
          <p
            class="mb-0"
            :style="selectedType == 'single' ? selectedStyle : unSelectedStyle"
          >
            単身世帯
          </p>
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          :class="(selectedType == 'family' ? 'checked' : 'unchecked') + ' btn'"
          data-bs-toggle="button"
          @click="selectHouseType('family')"
        >
          <human-male-female-child
            :fill-color="
              selectedType == 'family'
                ? selectedStyle.color
                : unSelectedStyle.color
            "
            :size="100"
            title="扶養あり"
          />
          <p
            class="mb-0"
            :style="selectedType == 'family' ? selectedStyle : unSelectedStyle"
          >
            扶養あり
          </p>
        </button>
      </div>
    </div>
    <!-- 年収選択 -->
    <div class="row mt-4">
      <div class="col">
        <h3>あなたの年収は？</h3>
      </div>
    </div>
    <div class="row mt-4">
      <div
        id="display-yearly-income"
        class="col-12 col-lg-3 order-lg-0 order-1"
      >
        <div class="row">
          <p
            class="money mb-0 col-7 order-1 text-end"
            :style="'color:' + selectedStyle.color"
          >
            {{ yearlyIncome | displayMoney }}
          </p>
          <p class="small col-5 order-0 mb-0 align-self-center text-end">
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
            <div class="accordion-item accordion-box">
              <h2 class="accordion-header " id="headingOne">
                <button
                  class="accordion-button "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >

                      <dance-ballroom
                        fill-color="#ddd"
                        :size="80"
                        class="accordion-icon"
                      />
                      <p class="accordion-title"
                        >レクリエーション・文化活動の支援</p
                      >

                    <div class="fw-bold fs-3">
                      {{ recreationTax | displayMoney }}
                    </div>
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body p-0">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td><dance-ballroom :size="30" /></td>
                        <td>レクリエーション・スポーツ・サービス</td>
                        <td>{{ recreationTax | displayMoney }}</td>
                      </tr>
                      <tr>
                        <td><dance-ballroom :size="30" /></td>
                        <td>レクリエーション・スポーツ・サービス</td>
                        <td>{{ recreationTax | displayMoney }}</td>
                      </tr>
                      <tr>
                        <td><dance-ballroom :size="30" /></td>
                        <td>レクリエーション・スポーツ・サービス</td>
                        <td>{{ recreationTax | displayMoney }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-box">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >

                      <hospital-box
                        fill-color="#ddd"
                        :size="80"
                        class="accordion-icon"
                      />
                      <span class="accordion-title"
                        >安全</span
                      >

                    <div class="fw-bold fs-3">
                      {{ recreationTax | displayMoney }}
                    </div>

                </button>
              </h2>
              </div>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body p-0">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td><dance-ballroom :size="30" /></td>
                        <td>レクリエーション・スポーツ・サービス</td>
                        <td>{{ recreationTax | displayMoney }}</td>
                      </tr>
                      <tr>
                        <td><dance-ballroom :size="30" /></td>
                        <td>レクリエーション・スポーツ・サービス</td>
                        <td>{{ recreationTax | displayMoney }}</td>
                      </tr>
                      <tr>
                        <td><dance-ballroom :size="30" /></td>
                        <td>レクリエーション・スポーツ・サービス</td>
                        <td>{{ recreationTax | displayMoney }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                      <div class="text-wrap" style="width: 50vw;">
                        ああああああああああああああああああああああああああああああああああああああ
                      </div>
                      <p>
                        bbb
                      </p>
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
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
import HospitalBox from 'vue-material-design-icons/HospitalBox.vue'
import TaxItem from './TaxItem.vue'
import Slider from './slider.vue'

export type DataType = {
  /**
   * 単身世帯 or 扶養あり
   */
  selectedType: 'single' | 'family'
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
}

export default Vue.extend({
  components: {
    HumanHandsdown,
    HumanMaleFemaleChild,
    DanceBallroom,
    HospitalBox,
    TaxItem,
    Slider,
  },
  filters: {
    /**
     * 金額を見やすく表示（接頭辞に円マーク、3桁区切りで表示）
     */
    displayMoney: (value: Number) => {
      let seisu = String(value)
      let syosu = ''
      if (String(value).indexOf('.') > 0) {
        syosu = '.' + String(value).split('.')[1]
        seisu = String(value).replace(syosu, '')
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

      return '\\' + seisu + syosu
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
    }
  },
  
  watch: {
    sliderValue(newValue: number, _) {
      // TODO:税額更新
      this.yearlyIncome = newValue
      this.yearlyTax = this.yearlyIncome * 0.06
    },
  },
  async mounted() {
    // console.log(this.$repositories('cofog').get())
    // const service = new CofogService(this.$nuxt)
    // service.GetData()

    // console.log(this.$accessor.regionCofogData.regionCofogData)
    // console.log(this.$repositories('cofog').Get())
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

<style scoped lang='scss'>
h3 {
  border-bottom: solid 3px #359af2;
  position: relative;
  color: #2e3c8c;
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
