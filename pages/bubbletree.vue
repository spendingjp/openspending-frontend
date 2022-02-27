<template>
  <div class="container my-4">
    <page-title title="使途別予算額" />
    <div class="row justify-content-center mt-1">
      <div class="col-3 col-md-1">
        <svg id="legend" viewBox="0 0 100 100">
          <circle cy="50" cx="50" r="50" fill="#4FC3F7" />
          <circle
            v-show="selectedData.level2Items.amount !== 0"
            cy="60"
            cx="50"
            r="40"
            fill="#4DB6AC"
          />
          <circle
            v-show="selectedData.level3Items.amount !== 0"
            cy="70"
            cx="50"
            r="30"
            fill="#FFD54F"
          />
        </svg>
      </div>
      <div class="col-9 col-md-5 text-start">
        <!-- 第1レベルリスト -->
        <p
          class="mb-0"
          data-bs-toggle="collapse"
          href="#level1-item-list"
          role="button"
          aria-expanded="false"
          aria-controls="level1-item-list"
        >
          総額:{{
            selectedData.level1Items.amount | displayMoney
          }}億<ArrowDownDropCircleOutline class="ms-1" :size="20" />
        </p>
        <div id="level1-item-list" class="collapse">
          <ul>
            <li
              v-for="(level1Item, i) in selectedData.level1Items.list"
              :key="i"
            >
              <CheckboxBlankCircle
                :fill-color="bubbleColors[(i + 1) % bubbleColors.length]"
                class="me-2"
              />{{ level1Item.name }} {{ level1Item.amount | displayMoney }}億
            </li>
          </ul>
        </div>
        <!-- 第2レベルリスト -->
        <p
          v-show="selectedData.level2Items.amount !== 0"
          class="mb-0 ms-3"
          data-bs-toggle="collapse"
          href="#level2-item-list"
          role="button"
          aria-expanded="false"
          aria-controls="level2-item-list"
        >
          {{ selectedData.level2Items.name }}:{{
            selectedData.level2Items.amount | displayMoney
          }}億<ArrowDownDropCircleOutline class="ms-1" :size="20" />
        </p>
        <div id="level2-item-list" class="collapse">
          <ul>
            <li
              v-for="(level2Item, i) in selectedData.level2Items.list"
              :key="i"
            >
              <!-- グラフでは当該レベルの総額を示す円が1番目にあるので、同じ色を使うため順番を揃える -->
              <CheckboxBlankCircle
                v-show="level2Item.amount !== 0"
                :fill-color="bubbleColors[(i + 1) % bubbleColors.length]"
                class="me-2"
              />
              <CheckboxBlankCircleOutline
                v-show="level2Item.amount === 0"
                class="me-2"
              />
              {{ level2Item.name }} {{ level2Item.amount | displayMoney }}億
            </li>
          </ul>
        </div>
        <!-- 第3レベルリスト -->
        <p
          v-show="selectedData.level3Items.amount !== 0"
          class="mb-0 ms-5"
          data-bs-toggle="collapse"
          href="#level3-item-list"
          role="button"
          aria-expanded="false"
          aria-controls="level3-item-list"
        >
          {{ selectedData.level3Items.name }}:{{
            selectedData.level3Items.amount | displayMoney
          }}億<ArrowDownDropCircleOutline class="ms-1" :size="20" />
        </p>
        <div id="level3-item-list" class="collapse">
          <ul>
            <li
              v-for="(level3Item, i) in selectedData.level3Items.list"
              :key="i"
            >
              <!-- グラフでは当該レベルの総額を示す円が1番目にあるので、同じ色を使うため順番を揃える -->
              <CheckboxBlankCircle
                v-show="level3Item.amount !== 0"
                :fill-color="bubbleColors[(i + 1) % bubbleColors.length]"
                class="me-2"
              />
              <CheckboxBlankCircleOutline
                v-show="level3Item.amount === 0"
                class="me-2"
              />
              {{ level3Item.name }} {{ level3Item.amount | displayMoney }}億
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-2 mb-2">
      <div
        v-show="selectedData.level2Items.amount !== 0"
        class="col-12 col-md-6"
        role="button"
        @click="handleBubbleClick(null, null)"
      >
        <ArrowUp />上位レベルを表示
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <svg id="graph" :viewBox="'0 0 ' + svgWidth + ' ' + svgHeight" />
        <div id="tooltip">ツールチップ</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'
import ArrowDownDropCircleOutline from 'vue-material-design-icons/ArrowDownDropCircleOutline.vue'
import ArrowUp from 'vue-material-design-icons/ArrowUp.vue'
import CheckboxBlankCircle from 'vue-material-design-icons/CheckboxBlankCircle.vue'
import CheckboxBlankCircleOutline from 'vue-material-design-icons/CheckboxBlankCircleOutline.vue'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import PageTitle from '@/components/PageTitle.vue'

type DataType = {
  /**
   * 描画したSVG要素の幅
   */
  viewBoxWidth: number
  /**
   * 描画したSVG要素の高さ
   */
  viewBoxHeight: number
  /**
   * SVG要素に指定する幅
   */
  svgWidth: number
  /**
   * SVG要素に指定する高さ
   */
  svgHeight: number
  /**
   * バブル表示用データ
   */
  circlePackData: {
    name: string
    // サークルパッキングでは"children"は特別な意味を持つため使用しない
    childrenData: {
      name: string
      value: number
      childrenData: {
        name: string
        value: number
      }[]
    }[]
  }
  /**
   * バブル用のカラーコード
   */
  bubbleColors: string[]
  /**
   * テキスト表示用データ
   */
  selectedData: {
    level1Items: {
      amount: number
      list: {
        name: string
        amount: number
      }[]
    }
    level2Items: {
      amount: number
      name: string
      list: {
        name: string
        amount: number
      }[]
    }
    level3Items: {
      amount: number
      name: string
      list: {
        name: string
        amount: number
      }[]
    }
  }
}

export default Vue.extend({
  components: {
    ArrowDownDropCircleOutline,
    ArrowUp,
    CheckboxBlankCircle,
    CheckboxBlankCircleOutline,
    PageTitle,
  },
  filters: {
    displayMoney(val: string) {
      return Math.round(Number(val) / 10000000) / 10
    },
  },
  data(): DataType {
    return {
      viewBoxWidth: 0,
      viewBoxHeight: 0,
      svgWidth: 600,
      svgHeight: 500,
      circlePackData: {
        name: '',
        childrenData: [
          { name: '', value: 0, childrenData: [{ name: '', value: 0 }] },
        ],
      },
      bubbleColors: [
        '#F06292',
        '#7986CB',
        '#26A69A',
        '#ef9a9a',
        '#80CBC4',
        '#81D4FA',
        '#BCAAA4',
        '#B0BEC5',
        '#e57373',
        '#DCE775',
      ],
      selectedData: {
        level1Items: {
          amount: 0,
          list: [
            {
              name: '',
              amount: 0,
            },
          ],
        },
        level2Items: {
          amount: 0,
          name: '',
          list: [
            {
              name: '',
              amount: 0,
            },
          ],
        },
        level3Items: {
          amount: 0,
          name: '',
          list: [
            {
              name: '',
              amount: 0,
            },
          ],
        },
      },
    }
  },
  head() {
    return {
      title: '使途別予算額',
    }
  },
  async beforeMount() {
    // TODO: move to middleware
    const hostname = window.location.hostname
    try {
      this.$accessor.regionCofogData.setHostname(hostname)
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.error('Error on nuxtServerInit: ', err)
        this.$router.push({
          path: '404.html',
        })
        return
      }
    }

    try {
      await this.$accessor.regionCofogData.fetchBudgetListAndWdmmgData()
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.error('Error on nuxtServerInit: ', err)
        this.$router.push({
          path: '404.html',
        })
      }
    }
    const cofogData: CofogData = this.$repositories('cofogData').Get()
    if (!cofogData) {
      this.$router.push({ path: '/' })
    }
    this.circlePackData.childrenData = cofogData.taxList.map((item) => ({
      name: item.cofog.Name,
      value: item.amount.value,
      childrenData: item.children.map((child) => ({
        name: child.cofog.Name,
        value: child.amount.value,
        childrenData: child.children.map((level3Item) => ({
          name: level3Item.cofog.Name,
          value: level3Item.amount.value,
        })),
      })),
    }))
  },
  mounted() {
    const svg = d3.select('#graph')

    const viewBox = svg.attr('viewBox')
    const regexViewBox = /\d+ \d+ (\d+) (\d+)/

    const matchedViewBox = viewBox.match(regexViewBox)
    if (matchedViewBox === null) {
      // svgが見つからない場合
      throw new Error('matchedViewBox is null')
    }
    // SVG要素の属性から高さと幅を取得
    const [, viewBoxWidth, viewBoxHeight] = matchedViewBox.map((item) =>
      Number.parseInt(item, 10)
    )
    this.viewBoxWidth = viewBoxWidth
    this.viewBoxHeight = viewBoxHeight
    const root = d3.hierarchy({
      name: '',
      children: this.circlePackData.childrenData,
    }) // 階層データに変換(children要素は必須)
    root.sum((d: any) => d.value) // 子ノードの合計を計算
    this.showCofogLevelBubbles({
      name: '',
      childrenData: this.circlePackData.childrenData,
    })
    this.setListText(this.circlePackData, '')
  },
  methods: {
    /**
     * ズーム
     */
    zoom(event: any): Promise<string> {
      return new Promise((resolve) => {
        // 表示中の最下位レベルのバブルグループを取得
        let maxLevel = 0
        d3.selectAll('g.bubbles').each(function () {
          const level = Math.trunc(
            Number(d3.select(this).attr('data-cofog-level'))
          )
          if (level > maxLevel) {
            maxLevel = level
          }
        })
        const targetGroup = d3
          .selectAll('g.bubbles')
          .filter(`[data-cofog-level='${maxLevel}']`)

        // ズーム
        targetGroup
          .transition()
          .duration(700)
          .attr(
            'transform',
            `translate(${this.viewBoxWidth / 2},${
              this.viewBoxHeight / 2
            })scale(5)translate(${-event.target.__data__.x},${-event.target
              .__data__.y})`
          )
          .on('end', () => {
            // 再表示したときのためにズームをやめる
            targetGroup.attr(
              'transform',
              `translate(${event.target.__data__.x - event.target.__data__.x},${
                event.target.__data__.y - event.target.__data__.y
              })`
            )
            resolve('')
          })
      })
    },
    /**
     * 円クリックハンドラ
     * 表示中の階層に応じて親または子要素を表示する
     * @param {any} event d3のクリックイベント
     */
    async handleBubbleClick(event: any, d: any) {
      if (d !== null && d.data.childrenData !== undefined) {
        await this.zoom(event)
        // 子要素がある場合は表示する
        this.showCofogLevelBubbles(d.data)
        this.setListText(d.data, d.data.name)
      } else {
        // 子要素がない場合は、1つ上の階層を表示する
        const bubbles = d3.selectAll('g.bubbles').size()
        if (bubbles >= 2) {
          this.hideCofogLevelCircle()
          this.setListText(null, '')
        }
      }
    },
    /**
     * COFOGの各レベルのバブルを表示する
     */
    showCofogLevelBubbles(d: any) {
      // 表示中のバブルを非表示にする
      const bubbles = d3.select('#graph').selectAll('g.bubbles')
      bubbles.attr('opacity', 0)
      bubbles.selectAll('g.parents').on('mouseover', () => {}) // ツールチップ非表示

      // バブルを表示する
      const root = d3.hierarchy({
        name: '',
        children: d.childrenData,
      }) // 階層データに変換(children要素は必須)
      root.sum((d: any) => d.value) // 子ノードの合計を計算
      const pack = d3
        .pack()
        .size([this.viewBoxWidth * 0.9, this.viewBoxHeight * 0.9])
        .padding(5)
      pack(root)

      const cofogLevel = bubbles.size() + 1
      const nodes = root.descendants()
      const node = d3
        .select('svg#graph')
        .append('g')
        .attr('class', 'bubbles')
        .attr('data-cofog-level', cofogLevel)
        .selectAll('g.parents')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'parents')
      // 円描画
      node
        .append('circle')
        .attr('r', (d: any) => d.r)
        .attr(
          'fill',
          (d, i) =>
            d.children
              ? 'white'
              : this.bubbleColors[i % this.bubbleColors.length] // 総額の円は描画しない
        )
        .on('click', (event, d) => {
          this.handleBubbleClick(event, d)
        })

      const amountRemovedNodes: any = nodes.filter(
        (item) => item.children === undefined
      )

      this.animateBubbles(node, amountRemovedNodes)

      // 税額
      this.appendTaxText(node)

      // 分類名
      this.appendCategoryText(node)

      this.showTooltip(node)
    },
    /**
     * 小分類の円を消して大分類の円を再表示
     */
    hideCofogLevelCircle() {
      // 大分類の円を再表示
      let maxLevel = 0
      d3.selectAll('g.bubbles').each(function () {
        const level = Math.trunc(
          Number(d3.select(this).attr('data-cofog-level'))
        )
        if (level > maxLevel) {
          maxLevel = level
        }
      })
      // 小分類の円を消す
      d3.selectAll('g.bubbles')
        .filter(`[data-cofog-level='${maxLevel}']`)
        .remove()

      const bubbles = d3
        .selectAll('g.bubbles')
        .filter(`[data-cofog-level='${maxLevel - 1}']`)
        .attr('opacity', '1')

      this.showTooltip(bubbles.selectAll('g.parents'))
    },
    /**
     * 文字幅を取得する
     * @param {string} text 文字列
     * @param {number} px フォントサイズ（px）
     * @returns {number} 文字列の表示幅(px)
     */
    getWordWidth(text: string, px: number = 18): number {
      if (px <= 0) {
        throw new Error('フォントサイズには0より大きい値を指定してください')
      }
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (context === null) {
        throw new Error('文字幅取得時の要素取得失敗')
      }
      context.font = `${px}px "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "BIZ UDPGothic", Meiryo, sans-serif`

      const svg = document.getElementById('graph')
      if (svg === null) {
        throw new Error('文字幅取得時の描画領域取得失敗')
      }
      return (
        (context?.measureText(text).width * svg.clientWidth) / this.svgWidth
      )
    },
    /**
     * 税額表示
     */
    appendTaxText(node: any) {
      const overSize = 30
      node
        .append('foreignObject')
        .attr('x', (d: any) => -d.r - overSize / 2)
        .attr('y', (d: any) => (d.r > 50 ? (-d.r * 2) / 3 : -d.r)) // 円が小さい場合は分類名に重なるのを防ぐ
        .attr('width', (d: any) => d.r * 2 + overSize) // width, heigt必須
        .attr('height', 100)
        .attr('fill', 'transparent')
        .style('pointer-events', 'none')
        .append('xhtml:div')
        .html((d: any) => {
          if (d.data.value === undefined || d.parent === null) {
            return null
          }
          const taxText = Math.round(d.data.value / 10000000) / 10

          const textDisplayLength = this.getWordWidth(taxText.toString()) + 30 // 金額 + '億'の幅
          if (textDisplayLength > d.r) {
            if (textDisplayLength < d.r * 2 + overSize) {
              // 文字が円から少しだけはみ出す場合は、文字を小さくして表示
              return `<p class="text-center m-0 text-small">${taxText}<span class="text-small">億</span></p>`
            }
          } else {
            return `<p class="text-center m-0 fs-1">${taxText}<span class="fs-5">億</span></p>`
          }
        })
    },
    /**
     * 分類名表示
     */
    appendCategoryText(node: any) {
      node
        .append('foreignObject')
        .attr('x', (d: any) => -d.r)
        .attr('y', (d: any) => d.r / 5)
        .attr('width', (d: any) => d.r * 2) // width, heigt必須
        .attr('height', 100)
        .attr('fill', 'transparent')
        .style('pointer-events', 'none')
        .append('xhtml:div')
        .html((d: any) => {
          if (d.parent === null) {
            // 各分類の最上位の円では名称を表示しない
            return
          }
          const textDisplayLength = this.getWordWidth(d.data.name)
          if (
            textDisplayLength < d.r * 2 || // 1行で収まるか
            (textDisplayLength / 2 < d.r * 2 && // 2行分の高さがある
              d.r > 30 * 2)
          ) {
            return `<p class="text-center m-0">${d.data.name}</p>`
          } else if (
            textDisplayLength < d.r * 2 + 30 ||
            (textDisplayLength / 2 < d.r * 2 + 30 && d.r > 30 * 2)
          ) {
            // 少しはみ出す場合は小さくして表示
            return `<p class="text-center m-0 text-small">${d.data.name}</p>`
          } else {
            // 文字が円をはみ出す場合は表示しない
            return null
          }
        })
    },
    /**
     * ツールチップ表示
     */
    showTooltip(node: any) {
      if ('ontouchstart' in window) {
        // スマホでは表示しない
        return
      }
      node
        .on('mouseover', (_: any, data: any) => {
          if (data.data.children === undefined) {
            d3.select('#tooltip')
              .style('visibility', 'visible')
              .html(
                `${data.data.name}<br />${
                  data.value !== undefined
                    ? Math.round(data.value / 10000000) / 10
                    : 0
                }億`
              )
          }
        })
        .on('mousemove', (event: any, data: any) => {
          if (data.data.children === undefined) {
            // ちらつき防止
            d3.select('#tooltip')
              .style('top', event.pageY + 20 + 'px')
              .style('left', event.pageX + 20 + 'px')
          }
        })
        .on('mouseout', (_: any, data: any) => {
          if (data.data.children === undefined) {
            d3.select('#tooltip').style('visibility', 'hidden')
          }
        })
    },
    /**
     * アニメーション
     * @param {any} nodes アニメーション対象のノード
     * @param {any} targetData 表示対象のデータ
     */
    animateBubbles(nodes: any, targetData: any) {
      /* force(): 各ノードに力を与える
       *    第1引数：力の種類（collision:各々を衝突させる, x:x=nに並べる）
       *          https://github.com/d3/d3-force#forces
       *    第2引数：力の計算方法
       *        strength: 力の強さ
       */
      const simulation = d3
        .forceSimulation()
        // 各バブルが重ならないようにする
        .force(
          'collision',
          d3
            .forceCollide()
            .radius((d: any) => d.r + 50)
            .strength(0.3)
        )
        // 真ん中に集める
        .force('x', d3.forceX(this.viewBoxWidth / 2).strength(0.1))
        .force('y', d3.forceY(this.viewBoxHeight / 2).strength(0.1))
        .alphaDecay(0) // 動かし続ける

      const ticked = () => {
        // シミュレーション結果を反映して、ノードを動かす
        nodes.attr('transform', (d: any) => {
          return `translate(${d.x},${d.y})`
        })
      }
      simulation.nodes(targetData).on('tick', ticked) // nodesに渡したものをシミュレーション対象とする
    },

    setListText(d: any, clickedTitle: string) {
      // 大分類の円を再表示
      let maxLevel = 0
      d3.selectAll('g.bubbles').each(function () {
        const level = Math.trunc(
          Number(d3.select(this).attr('data-cofog-level'))
        )
        if (level > maxLevel) {
          maxLevel = level
        }
      })
      let isAdd = false
      switch (maxLevel) {
        case 1:
          isAdd = this.selectedData.level1Items.amount === 0
          break
        case 2:
          isAdd = this.selectedData.level2Items.amount === 0
          break

        case 3:
          isAdd = this.selectedData.level3Items.amount === 0
          break

        default:
          throw new Error('グラフの表示レベルが想定外')
      }

      if (isAdd) {
        const list = d.childrenData.map((item: any) => ({
          name: item.name,
          amount: item.value,
        }))
        const amount = list.reduce(
          (prevVal: any, currentVal: any) => prevVal + currentVal.amount,
          0
        )
        if (maxLevel === 1) {
          this.selectedData.level1Items.list = list
          this.selectedData.level1Items.amount = amount
        } else if (maxLevel === 2) {
          this.selectedData.level2Items.list = list
          this.selectedData.level2Items.amount = amount
          this.selectedData.level2Items.name = clickedTitle
        } else if (maxLevel === 3) {
          this.selectedData.level3Items.list = list
          this.selectedData.level3Items.amount = amount
          this.selectedData.level3Items.name = clickedTitle
        }
      } else {
        if (maxLevel === 1) {
          this.selectedData.level2Items.list = []
          this.selectedData.level2Items.amount = 0
        }
        if (maxLevel === 2) {
          this.selectedData.level3Items.list = []
          this.selectedData.level3Items.amount = 0
        }
      }
    },
  },
})
</script>

<style lang="scss">
/*
 *  ツールチップ
 */
#tooltip {
  position: absolute;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  min-height: 80px;
  min-width: 150px;
  border-radius: 10px;
  padding: 10px 10px;
}

#legend {
  height: 100px;
}

#level1-item-list ul,
#level2-item-list ul,
#level3-item-list ul {
  list-style: none;
}

#graph circle {
  cursor: pointer;
}
</style>
