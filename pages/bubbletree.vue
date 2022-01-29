<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">
        <svg id="sample" viewBox="0 0 500 500" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

export default Vue.extend({
  data() {
    return {
      viewBoxWidth: 0,
      viewBoxHeight: 0,
      circlePackData: {
        name: 'A',
        children: [
          { name: 'B', value: 55 },
          {
            name: 'C',
            children: [
              { name: 'D', value: 30 },
              { name: 'E', value: 15 },
              { name: 'F', value: 10 },
            ],
          },
          { name: 'G', value: 15 },
          {
            name: 'H',
            children: [
              { name: 'I', value: 20 },
              { name: 'J', value: 10 },
            ],
          },
          { name: 'K', value: 10 },
        ],
      },
      isZoomed: false,
    }
  },
  head() {
    return {
      title: '使途別予算額',
    }
  },
  mounted() {
    const svg = d3.select('#sample')

    const viewBox = svg.attr('viewBox')
    const regexViewBox = /\d+ \d+ (\d+) (\d+)/

    const matchedViewBox = viewBox.match(regexViewBox)
    if (matchedViewBox === null) {
      // svgが見つからない場合
      throw new Error('matchedViewBox is null')
    }
    // SVG要素の属性から高さと幅を取得
    const [, viewBoxWidth, viewBoxHeight] = matchedViewBox.map(
      (item) => Number.parseInt(item, 10) // 基数に10を指定。誤変換防止？
    )
    this.viewBoxWidth = viewBoxWidth
    this.viewBoxHeight = viewBoxHeight

    // =======================================================================================
    // サークルパッキング
    // =======================================================================================
    // ------------------------------------------------------------------------
    //  大分類の円
    // ------------------------------------------------------------------------
    const parent = this.circlePackData.children.map((item) => ({
      name: item.name,
      value: item.value !== undefined ? item.value : 20,
    }))

    const root = d3.hierarchy({ name: 'test', children: parent }) // 階層データに変換(children要素は必須)
    root.sum((d: any) => d.value) // 子ノードの合計を計算

    const pack = d3
      .pack()
      .size([this.viewBoxWidth, this.viewBoxHeight])
      .padding(5)
    pack(root)

    const color = ['#F06292', '#7986CB', '#26A69A', '#ef9a9a', '#80CBC4']
    const node = svg
      .selectAll('.parents')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
      .attr('class', 'parents')
    // 円描画
    node
      .append('circle')
      .attr('r', (d: any) => d.r)
      .attr('fill', (d, i) => (d.children ? 'white' : color[i % 5])) // 総額の円は描画しない
      .attr('data-name', (d) => d.data.name)
    // 分類名表示
    node
      .append('foreignObject')
      .attr('x', (d: any) => -d.r)
      .attr('y', (d: any) => -d.r / 3)
      .attr('width', (d: any) => d.r * 2) // width, heigt必須
      .attr('height', 100)
      .attr('fill', 'transparent')
      .append('xhtml:div')
      .html(
        `<p class="text-center m-0">レクリエーション・<br />文化活動の支援</p>`
      )

    svg.selectAll('circle').on('click', (event, i) => {
      if (!this.isZoomed) {
        this.level1CircleClickHandler(event)
      }
    })

    // })
  },
  methods: {
    /**
     * 大分類の円クリックハンドラ
     */
    level1CircleClickHandler(event: any) {
      console.log('大分類クリック')
      // 大分類を消す
      d3.select('svg').selectAll('g.parents').attr('opacity', '0')
      this.showChildrenCircles(event)
    },
    /**
     * 子分類の円を表示する
     */
    showChildrenCircles(event: any) {
      // 子分類データを取得
      const childData = this.circlePackData.children.find(
        (item) => item.name === event.target.attributes['data-name'].value
      )
      const root = d3.hierarchy(childData)
      const circlePackDataR = root
        .sum((d) => (d !== undefined && d.value !== undefined ? d.value : 0))
        .children?.map((node) => ({ r: node.value }))

      // サークルパッキングで表示
      const pack = d3
        .pack()
        .size([this.viewBoxWidth, this.viewBoxHeight])
        .padding(3)
      if (circlePackDataR !== undefined) {
        pack(root)
        const node = d3
          .select('svg')
          .selectAll('g.zoomed')
          .data(root.descendants())
          .enter()
          .append('g')
          .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
          .attr('class', 'zoomed')
          .on('click', () => {
            this.hideChildrenCircle()
          })

        const colors = ['#FFE082', '#C5E1A5', '#80CBC4']
        node
          .append('circle')
          .attr('r', (d: any) => d.r)
          .attr('fill', (d, i) =>
            d.children ? 'rgba(129, 212, 250, 0.3)' : colors[i % 3]
          )

        this.isZoomed = true
      }
    },
    /**
     * 小分類の円を消して大分類の円を再表示
     */
    hideChildrenCircle() {
      console.log('小分類⇒大分類:isZoomed', this.isZoomed)
      if (this.isZoomed) {
        const svg = d3.select('svg')
        d3.selectAll('.parents').attr('opacity', 1) // 大分類名を再表示

        svg.selectAll('g.zoomed').remove() // 小分類の円を消す
        this.isZoomed = false
      }
    },
  },
})
</script>

<style>
div.bar {
  display: inline-block;
  width: 20px;
  height: 75px; /* この数値は実行時に上書きされます */
  background-color: teal;
  margin-right: 2px;
}

#test-title {
  width: 500px;
  height: 500px;
}
</style>