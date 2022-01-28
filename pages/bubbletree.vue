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
    const target = document.getElementById('test-title')
    // const app = new PIXI.Application({
    //   backgroundColor: 0xffffff,
    //   antialias: true,
    // })
    // if (target !== null) {
    //   target.appendChild(app.view)
    //   app.renderer.resize(target.clientWidth, target.clientHeight)
    // }
    // const obj = new PIXI.Graphics()
    // obj.beginFill(0xff0000)
    // obj.drawCircle(100, 110, 50)
    // obj.interactive = true
    // obj.alpha = 0.5

    // const cir = new PIXI.Graphics()
    // cir.drawPolygon([])

    // const obj2 = new PIXI.Graphics()
    // obj2.beginFill(0x0000ff)
    // obj2.drawCircle(200, 300, 50)
    // obj2.interactive = true

    // const circle1 = new PIXI.Graphics()
    // circle1.beginFill(0x00ff00)
    // circle1.drawCircle(200, 350, 30)

    // const circle1outer = new PIXI.Graphics()
    // circle1outer.lineStyle({ width: 30, color: 0x29b6f6, cap: LINE_CAP.ROUND })
    // const p0 = [100, 100]
    // const p1 = [100, 200]
    // const p2 = [300, 200]
    // const r = 100
    // circle1outer.moveTo(p0[0], p0[1])
    // circle1outer.arcTo(p1[0], p1[1], p2[0], p2[1], r)

    // const circle2 = new PIXI.Graphics()
    // circle2.lineStyle({ width: 30, color: 0xffca28, cap: LINE_CAP.ROUND })
    // const circle2p0 = [100, 100]
    // const circle2p1 = [100, 0]
    // const circle2p2 = [300, 0]
    // const circle2p3 = [300, 0]
    // const circle2r = 100
    // circle2
    //   .moveTo(circle2p0[0], circle2p0[1])
    //   .arcTo(circle2p1[0], circle2p1[1], circle2p2[0], circle2p2[1], circle2r)
    //   .moveTo(circle2p0[0], circle2p0[1])

    // let isZoomed = false
    // const onClick = (event) => {
    //   if (isZoomed) {
    //     app.stage.scale.x = 1
    //     app.stage.scale.y = 1
    //     if (target !== null) {
    //       app.stage.x = 0
    //       app.stage.y = 0
    //     }
    //   } else {
    //     app.stage.scale.x *= 2.5
    //     app.stage.scale.y *= 2.5
    //     if (target !== null) {
    //       app.stage.x = target.clientWidth / 2 - event.data.global.x * 2.5
    //       app.stage.y = target.clientHeight / 2 - event.data.global.y * 2.5
    //     }
    //   }
    //   isZoomed = !isZoomed
    // }
    // obj.on('pointerdown', onClick)
    // obj2.on('pointerdown', onClick)

    // let elapsed = 0
    // app.ticker.add((delta) => {
    //   elapsed += delta
    //   // obj.x = Math.sin(elapsed * 0.05) * 5
    //   // obj.y = Math.cos(elapsed * 0.05) * 5
    //   circle1.alpha = Math.cos(elapsed * 0.05) * 0.3
    //   circle1.x = 150 + 10 * Math.cos(elapsed * 0.05)
    // })

    // // app.stage.addChild(obj)
    // // app.stage.addChild(obj2)
    // // app.stage.addChild(circle1)
    // app.stage.addChild(circle1outer)
    // app.stage.addChild(circle2)

    // let elapsed = 0.0

    // app.ticker.add((delta) => {
    //   elapsed += delta
    //   obj.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0
    // })

    // const dataset = [
    //   25, 7, 5, 26, 11, 8, 25, 14, 23, 19, 14, 11, 22, 29, 11, 13, 12, 17, 18,
    //   10, 24, 18, 25, 9, 3,
    // ]

    // d3.select('#test-title')
    //   .selectAll('div')
    //   .data(dataset)
    //   .enter()
    //   .append('div')
    //   .attr('class', 'bar')
    //   .style('height', (d) => {
    //     const barHeight = d * 5
    //     return barHeight + 'px'
    //   })

    // const dataset = [
    //   5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23,
    //   25,
    // ]

    // const dataset = [
    //       { label: 'Abulia', count: 10 },
    //       { label: 'Betelgeuse', count: 20 },
    //       { label: 'Cantaloupe', count: 30 },
    //       { label: 'Dijkstra', count: 40 }
    //     ];
    // const w = 500
    // const h = 300
    // const donutWidth = 75
    // const radius = Math.min(w, h) / 2

    // const color = d3.scaleOrdinal(d3.schemeCategory10)
    // const svg = d3
    //   .select('#test-title')
    //   .append('svg')
    //   .attr('width', w)
    //   .attr('height', h)
    //   .append('g')
    //   .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')

    // const data = {a: 9, b: 20, c:30, d:8, e:12}

    // const arc = d3.arc()
    // .innerRadius(radius - donutWidth) // 内側のくりぬき
    // .outerRadius(radius)

    // const pie = d3.pie()
    // .value(d => d.count)
    // .sort(null)

    // const path = svg.selectAll('path')
    // .data(pie(dataset))

    // const bar = svg.append('g')

    // bar
    //   .selectAll( circle1')
    //   .data(dataset)
    //   .enter()
    //   .append( circle1')
    //   .attr('x', (d, i) => {
    //     return i * (w / dataset.length)
    //   })
    //   .attr('y', (d) => {
    //     return h - d * 4
    //   })
    //   .attr('width', w / dataset.length - barPadding)
    //   .attr('height', (d) => {
    //     return d * 4
    //   })
    //   .attr('fill', (d) => {
    //     return 'rgb(0, 0,' + d * 10 + ')'
    //   })

    // svg
    //   .selectAll('text')
    //   .data(dataset)
    //   .enter()
    //   .append('text')
    //   .text((d) => {
    //     return d
    //   })
    //   .attr('x', (d, i) => {
    //     return i * (w / dataset.length) + 5
    //   })
    //   .attr('y', (d) => {
    //     return h - d * 4 + 15
    //   })
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', '11px')
    //   .attr('fill', 'white')

    // const top = svg.append('g')
    // top
    //   .selectAll( circle1')
    //   .data(dataset)
    //   .enter()
    //   .append( circle1')
    //   .attr('x', function (d, i) {
    //     return i * (w / dataset.length)
    //   })
    //   .attr('y', function (d) {
    //     return h - d * 4 // SVG の高さからデータの値 x 4 を引く
    //   })
    //   .attr('width', w / dataset.length - barPadding)
    //   .attr('height', function (d) {
    //     return 8
    //   })
    //   .attr('fill', 'crimson')

    // const dataset = [
    //   [5, 20],
    //   [480, 90],
    //   [250, 50],
    //   [100, 33],
    //   [330, 95],
    //   [410, 12],
    //   [475, 44],
    //   [25, 67],
    //   [85, 21],
    //   [220, 88],
    //   [600, 150],
    // ]

    // const padding = 20
    // let xMax = d3.max(dataset, (d) => {
    //   return d[0]
    // })
    // if (typeof xMax === 'undefined') {
    //   xMax = 0
    // }

    // let yMax = d3.max(dataset, (d) => {
    //   return d[1]
    // })
    // if (typeof yMax === 'undefined') {
    //   yMax = 0
    // }

    // const xScale = d3
    //   .scaleLinear()
    //   .domain([0, xMax])
    //   .range([padding, w - padding * 2])
    // const yScale = d3
    //   .scaleLinear()
    //   .domain([0, yMax])
    //   .range([h - padding, padding])
    // const rScale = d3.scaleLinear().domain([0, yMax]).range([2, 5])

    // const svg = d3
    //   .select('#test-title')
    //   .append('svg')
    //   .attr('width', w)
    //   .attr('height', h)
    // svg
    //   .selectAll('circle')
    //   .data(dataset)
    //   .enter()
    //   .append('circle')
    //   .attr('cx', (d) => {
    //     return xScale(d[0])
    //   })
    //   .attr('cy', (d) => {
    //     return yScale(d[1])
    //   })
    //   .attr('r', (d) => {
    //     return rScale(d[0])
    //   })

    // svg
    //   .selectAll('text')
    //   .data(dataset)
    //   .enter()
    //   .append('text')
    //   .text((d) => {
    //     return d[0] + ',' + d[1]
    //   })
    //   .attr('x', (d) => {
    //     return xScale(d[0])
    //   })
    //   .attr('y', (d) => {
    //     return yScale(d[1])
    //   })

    // const zoomed = (event: any) => {
    //   const { transform } = event
    //   d3.selectAll('circle').attr('transform', transform)
    // }
    // const zoom = d3
    //   .zoom()
    //   // .extent([
    //   //   [0, 0],
    //   //   [w, h],
    //   // ])
    //   .scaleExtent([1, 8])
    //   .on('zoom', zoomed) as any

    // const clickZoom: any = (d, i, ele) => {
    //   zoomed(d)
    // }

    // const svg = d3
    //   .select('#test-title')
    //   .append('svg')
    //   .attr('width', w)
    //   .attr('height', h)
    // // svg.on('click', clickZoom)

    // const cofogData = [100, 200, 250, 380, 500, 510, 330, 1000]

    // const padding = 20
    // let xMax = d3.max(cofogData, (d) => {
    //   return d
    // })
    // if (typeof xMax === 'undefined') {
    //   xMax = 0
    // }
    // const xScale = d3
    //   .scaleLinear()
    //   .domain([0, xMax])
    //   .range([padding, w - padding * 2])
    // // const yScale = d3
    // //   .scaleLinear()
    // //   .domain([0, yMax])
    // //   .range([h - padding, padding])
    // const rScale = d3.scaleLinear().domain([0, xMax]).range([2, 30])

    // svg
    //   .selectAll('circle')
    //   .data(cofogData)
    //   .enter()
    //   .append('circle')
    //   .attr('r', (d) => {
    //     return rScale(d)
    //   })
    //   .attr('cx', (d, i) => {
    //     if (i !== cofogData.length - 1) {
    //       const radian = (360 / (cofogData.length - 1) / 180) * Math.PI
    //       return Math.cos(radian * (i + 1) + Math.PI / 2) * 100 + w / 2
    //     } else {
    //       return w / 2
    //     }
    //   })
    //   .attr('cy', (d, i) => {
    //     if (i !== cofogData.length - 1) {
    //       const radian = (360 / (cofogData.length - 1) / 180) * Math.PI
    //       console.log(radian, (radian * 180) / Math.PI)
    //       return Math.sin(radian * (i + 1) + Math.PI / 2) * 100 + h / 2
    //     } else {
    //       return h / 2
    //     }
    //   })
    //   .attr('fill', (d, i) => {
    //     if (i !== cofogData.length - 1) {
    //       return 'blue'
    //     } else {
    //       return 'red'
    //     }
    //   })

    //     type dataType = {
    //       name: string
    //       percentage: number
    //       value: number
    //       color: string
    //     }

    //     // input data
    //     const data: dataType[] = [
    //       {
    //         name: 'Public Sale',
    //         percentage: 20, // percentage
    //         value: 80, // millions
    //         color: '#0789F8',
    //       },
    //       {
    //         name: 'Reserved',
    //         percentage: 35,
    //         value: 140,
    //         color: '#F9BA00',
    //       },
    //       {
    //         name: 'Advisors',
    //         percentage: 10,
    //         value: 40,
    //         color: '#FE8C00',
    //       },
    //       {
    //         name: 'Foundation',
    //         percentage: 10,
    //         value: 40,
    //         color: '#A6A8F8',
    //       },
    //       {
    //         name: 'Option pool',
    //         percentage: 12.5,
    //         value: 50,
    //         color: '#47D7A8',
    //       },
    //       {
    //         name: 'Team Tokens',
    //         percentage: 12.5,
    //         value: 50,
    //         color: '#3BCB60',
    //       },
    //     ]

    //     // retrieve the svg in which to plot the viz
    //     const svg = d3.select('svg')

    //     // identify the dimensions of the viewBox to establish the svg canvas
    //     const viewBox = svg.attr('viewBox')
    //     const regexViewBox = /\d+ \d+ (\d+) (\d+)/

    //     const matchedViewBox = viewBox.match(regexViewBox)
    //     if (matchedViewBox === null) {
    //       // svgが見つからない場合
    //       throw new Error('matchedViewBox is null')
    //     }
    //     // SVG要素の属性から高さと幅を取得
    //     const [, viewBoxWidth, viewBoxHeight] = matchedViewBox.map(
    //       (item) => Number.parseInt(item, 10) // 基数に10を指定。誤変換防止？
    //     )

    //     // with the margin convention include a group element translated within the svg canvas
    //     const margin = {
    //       top: 20,
    //       right: 20,
    //       bottom: 20,
    //       left: 20,
    //     }
    //     // compute the width and height of the actual viz from the viewBox dimensions and considering the margins
    //     // this to later work with width and height attributes directly through the width and height variables
    //     // 余白を考慮して実際の描画領域の幅と高さを計算
    //     const width = viewBoxWidth - (margin.left + margin.right)
    //     const height = viewBoxHeight - (margin.top + margin.bottom)

    //     // compute the radius as half the minor size between the width and height
    //     // ドーナッツグラフの半径
    //     const radius = Math.min(width, height) / 2
    //     // initialize a variable to have the multiple elements share the same stroke-width property
    //     // グラフの線の幅
    //     const strokeWidth = 10

    //     const group = svg
    //       .append('g')
    //       .attr('transform', `translate(${margin.left} ${margin.top})`)

    //     // DEFAULT CIRCLE
    //     // circle used as a background for the colored donut chart
    //     // add a group to center the circle in the canvas (this to rotate the circle from the center)
    //     // 原点を描画領域の中心に移動
    //     const groupDefault = group
    //       .append('g')
    //       .attr('transform', `translate(${width / 2} ${height / 2})`)

    //     // append the circle showing only the stroke
    //     // 最初に表示する背景のみのグラフ
    //     groupDefault
    //       .append('circle')
    //       .attr('cx', 0) // 原点を描画領域の中心に移動したので、円の中心は0=原点
    //       .attr('cy', 0)
    //       .attr('r', radius) // 半径は描画領域の半＝円は全体に表示
    //       .attr('transform', 'rotate(-90)') // 12時の位置からスタートさせる
    //       .attr('fill', 'none')
    //       .attr('stroke', 'hsla(0, 0%, 0%, 0.08)') // (色相, 彩度, 明度, 透明度) = 薄いグレー
    //       .attr('stroke-width', strokeWidth)
    //       .attr('stroke-linecap', 'round') // 先端丸め
    //       // hide the stroke of the circle using the radius
    //       // this to compute the circumference of the shape
    //       // 鉛筆で書くようなアニメーション
    //       // https://fuuno.net/ani/ani16/ani16.html
    //       .attr('stroke-dasharray', radius * 3.14 * 2) // 破線の間隔を円周の長さにする
    //       .attr('stroke-dashoffset', radius * 3.14 * 2) // 円周の長さ分オフセットして、全てを隠す

    //     // COLORED CIRCLES
    //     // pie function to compute the arcs
    //     const pie = d3
    //       .pie()
    //       .sort(null) // 順番並び替え無し
    //       .padAngle(0.12)
    //       // use either the value or the percentage in the dataset
    //       .value((d: any) => d.value)

    //     // arc function to create the d attributes for the path elements
    //     const arc = d3
    //       .arc()
    //       // have the arc overlaid on top of the stroke of the circle
    //       .innerRadius(radius)
    //       .outerRadius(radius)

    //     /* for each data point include the following structure
    // g             // wrapping all arcs
    //   g           // wrapping each arc
    //     arc       // actual shape
    //     line      // connecting line
    //     text      // text label
    //   g
    //     arc
    //     ...
    // */
    //     // wrapping group, horizontally centered
    //     const groupArcs = group
    //       .append('g')
    //       .attr('transform', `translate(${width / 2} ${height / 2})`)

    //     const groupsArcs = groupArcs
    //       .selectAll('g')
    //       .data(pie(data))
    //       .enter()
    //       .append('g')

    //     // include the arcs specifying the stroke with the same width of the circle element
    //     groupsArcs
    //       .append('path')
    //       .attr('d', arc)
    //       .attr('fill', 'none')
    //       .attr('stroke', (d) => d.data.color)
    //       .attr('stroke-width', strokeWidth * 0.8)
    //       .attr('stroke-linecap', 'round')
    //       .attr('stroke-linejoin', 'round')
    //       // hide the segments by applying a stroke-dasharray/stroke-dashoffset equal to the circle circumference
    //       // ! the length of the element varies, and it considered afterwords
    //       // for certain the paths are less than the circumference of the entire circle
    //       .attr('stroke-dasharray', radius * 3.14 * 2)
    //       .attr('stroke-dashoffset', radius * 3.14 * 2)

    //     // include line elements visually connecting the text labels with the arcs
    //     groupsArcs
    //       .append('line')
    //       .attr('x1', 0)
    //       .attr('x2', (d) => {
    //         const [x] = arc.centroid(d)
    //         return x > 0 ? '25' : '-25'
    //       })
    //       .attr('y1', 0)
    //       .attr('y2', 0)
    //       .attr('stroke', ({ data: d }) => d.color)
    //       .attr('stroke-width', 1.5)
    //       .attr('transform', (d) => {
    //         const [x, y] = arc.centroid(d)
    //         const offset = x > 0 ? 20 : -20
    //         return `translate(${x + offset} ${y})`
    //       })
    //       .attr('stroke-dasharray', 25)
    //       .attr('stroke-dashoffset', 25)

    //     // include text elements associated with the arcs
    //     groupsArcs
    //       .append('text')
    //       .attr('x', 0)
    //       .attr('y', 0)
    //       .attr('font-size', 8)
    //       .attr('text-anchor', (d) => {
    //         const [x] = arc.centroid(d)
    //         return x > 0 ? 'start' : 'end'
    //       })
    //       .attr('transform', (d) => {
    //         const [x, y] = arc.centroid(d)
    //         const offset = x > 0 ? 50 : -50
    //         return `translate(${x + offset} ${y})`
    //       })
    //       .html(
    //         ({ data: d }) => `
    //     <tspan x="0">${d.name}:</tspan><tspan x="0" dy="10" font-size="6">${d.percentage}% / ${d.value}M</tspan>
    //   `
    //       )
    //       .style('opacity', 0)
    //       .style('visibility', 'hidden')

    //     // TRANSITIONS
    //     // once the elements are set up
    //     // draw the stroke of the larger circle element
    //     groupDefault
    //       .select('circle')
    //       .transition()
    //       .ease(d3.easeExp)
    //       .delay(200)
    //       .duration(1000)
    //       .attr('stroke-dashoffset', '0')
    //       // once the transition is complete
    //       // draw the smaller strokes one after the other
    //       .on('end', () => {
    //         // immediately set the stroke-dasharray and stroke-dashoffset properties to match the length of the path elements
    //         // using vanilla JavaScript
    //         const paths = document.querySelectorAll('svg g g path')
    //         paths.forEach((path) => {
    //           const length = path.getTotalLength()
    //           path.setAttribute('stroke-dasharray', length)
    //           path.setAttribute('stroke-dashoffset', length)
    //         })

    //         const duration = 1000
    //         // transition the path elements to stroke-dashoffset 0
    //         d3.selectAll('svg g g path')
    //           .transition()
    //           .ease(d3.easeLinear)
    //           .delay((d, i) => i * duration)
    //           .duration(duration)
    //           .attr('stroke-dashoffset', 0)

    //         // transition the line elements elements to stroke-dashoffset 0
    //         d3.selectAll('svg g g line')
    //           .transition()
    //           .ease(d3.easeLinear)
    //           .delay((d, i) => i * duration + duration / 2.5)
    //           .duration(duration / 3)
    //           .attr('stroke-dashoffset', 0)

    //         // transition the text elements to opacity 1 and visibility visible
    //         d3.selectAll('svg g g text')
    //           .transition()
    //           .ease(d3.easeLinear)
    //           .delay((d, i) => i * duration + duration / 2)
    //           .duration(duration / 2)
    //           .style('opacity', 1)
    //           .style('visibility', 'visible')
    //       })

    // const dataset = {
    //   apples: [53245, 28479, 19697, 24037, 40245],
    // }

    // const dataset2 = {
    //   apples: [13245, 58479, 29697, 74037, 20245],
    // }

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

    // const totalDoughnutChart = svg
    //   .append('g')
    //   .attr(
    //     'transform',
    //     'translate(' + viewBoxWidth / 2 + ',' + viewBoxHeight / 2 + ')'
    //   )

    // const radius = Math.min(viewBoxWidth, viewBoxHeight) / 2.5

    // const pie = d3.pie().sort(null)

    // const arc = d3
    //   .arc()
    //   .innerRadius(radius - 50)
    //   .outerRadius(radius)
    //   .cornerRadius(5) // 先端丸め
    //   .padAngle(Math.PI * 0.008) // 隙間

    // const color = (i: number) => {
    //   const colors = ['#64B5F6', '#9575CD', '#7986CB', '#4DB6AC', '#FFB74D']
    //   return colors[i % 5]
    // }

    // totalDoughnutChart
    //   .selectAll('path')
    //   .data(pie(dataset.apples))
    //   .enter()
    //   .append('path')
    //   .attr('fill', function (d, i) {
    //     return color(i)
    //   })
    //   // .attr('fill', 'red')
    //   .transition()
    //   .duration(2000) // アニメーション時間[ms]
    //   .attrTween('d', function (d: any) {
    //     const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
    //     return function (t) {
    //       d.startAngle = i(t).startAngle
    //       d.endAngle = i(t).endAngle
    //       return arc(d)
    //     }
    //   })
    //   .on('end', () => {
    //     // g.append('text')
    //     //   .text('安全・安心の確保')
    //     //   .attr('x', 100)
    //     //   .attr('width', 100)
    //     //   .attr('font-size', '1.3em')
    //   })

    // totalDoughnutChart
    //   .append('foreignObject')
    //   .attr('width', 100)
    //   .attr('height', 300)
    //   // .attr('transform', 'translate(50,150)')
    //   .append('xhtml:div')
    //   .style('font-size', '1.5em')
    //   .html('<p>885.3億</p>')

    // // totalDoughnutChart
    // //   .append('foreignObject')
    // //   .attr('width', 100)
    // //   .attr('height', 300)
    // //   .attr('x', 100)
    // //   .attr('y', 100)
    // //   .append('xhtml:div')
    // //   .style('font-size', '1.5em')
    // //   .style('color', '#FFFFFF')
    // //   .html('<p>88億</p>')

    // const childDoughnutChart = svg
    //   .append('g')
    //   .attr(
    //     'transform',
    //     'translate(' + viewBoxWidth / 2 + ',' + viewBoxHeight / 2 + ')'
    //   )

    // const arc2: any = d3
    //   .arc()
    //   .innerRadius(radius - 30 - 20)
    //   .outerRadius(radius - 30)
    //   .cornerRadius(10) // 先端丸め
    //   .padAngle(Math.PI * 0.008) // 隙間

    // childDoughnutChart
    //   .selectAll('path')

    //   .data(pie(dataset2.apples))
    //   .enter()
    //   .append('path')
    //   .attr('fill', function (_, i) {
    //     return color(i)
    //   })
    //   .attr('d', arc2)
    //   .attr('display', 'none') // 初期非表示

    // // 子グラフクリック
    // childDoughnutChart.selectAll('path').on('click', () => {
    //   childDoughnutChart.selectAll('path').attr('display', 'none')
    //   totalDoughnutChart.selectAll('path').attr('display', 'inline')
    //   totalDoughnutChart.selectAll('foreignObject').attr('display', 'inline')
    // })

    // // 親グラフクリック
    // totalDoughnutChart.selectAll('path').on('click', () => {
    //   childDoughnutChart.selectAll('path').attr('display', 'inline')
    //   totalDoughnutChart.selectAll('path').attr('display', 'none')
    //   totalDoughnutChart.selectAll('foreignObject').attr('display', 'none')
    // })

    // totalDoughnutChart.selectAll('path').on('mouseover', () => {
    //   console.log('hover')
    // })

    // d3.select('.pie').transition().duration(1000).attr('width', 250)
    // d3.select('.pie')
    //   .transition()
    //   .duration(3000)
    //   .attrTween('width', () => {
    //     const i = d3.interpolate(0, 250)
    //     return (t) => i(t)
    //   })
    // const dataset = [
    //   [50, 200, 30],
    //   [200, 50, 40],
    //   [100, 50, 25],
    //   [50, 100, 10],
    //   [50, 100, 20],
    //   [50, 100, 5],
    // ]

    // const circleXY = (i: number) => {
    //   return {
    //     x:
    //       150 *
    //         Math.cos(((Math.PI * 2) / dataset.length) * (i + 1) - Math.PI / 2) +
    //       200,
    //     y:
    //       150 *
    //         Math.sin(((Math.PI * 2) / dataset.length) * (i + 1) - Math.PI / 2) +
    //       200,
    //   }
    // }

    // svg
    //   .append('g')
    //   .attr(
    //     'transform',
    //     'translate(' + viewBoxWidth / 2 + ',' + viewBoxHeight / 2 + ')'
    //   )

    // svg
    //   .selectAll('circle')
    //   .data(dataset)
    //   .enter()
    //   .append('circle')
    //   .attr('cx', (_, i) => {
    //     return circleXY(i).x
    //   })
    //   .attr('cy', (_, i) => circleXY(i).y)
    //   .attr('r', (d) => d[2])
    //   .attr('fill', (_, i) => color(i))

    // svg
    //   .append('text')
    //   .text('安全・安心の確保')
    //   .attr('x', 200)
    //   .attr('y', 100)
    //   .attr('width', 100)
    //   .attr('font-size', `${viewBoxWidth / 30}px`)

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
    root.sum((d) => d.value) // 子ノードの合計を計算

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
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .attr('class', 'parents')
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('fill', (d, i) => (d.children ? 'white' : color[i % 5]))
      .attr('data-name', (d) => d.data.name)

    svg.selectAll('circle').on('click', (event, i) => {
      if (!this.isZoomed) {
        this.level1CircleClickHandler(event)
      }
    })

    // ------------------------------------------------------------------------
    //  小分類⇒大分類
    // ------------------------------------------------------------------------
    svg.on('click', () => {
      console.log('isZoomed', this.isZoomed)
      if (this.isZoomed) {
        console.log(this.viewBoxWidth / 2, this.viewBoxHeight / 2)
        svg.selectAll('g.zoomed').remove()
        const zoomed = ({ transform }) => {
          node.attr('transform', transform)
        }
        const zoom = d3.zoom().scaleExtent([1, 40]).on('zoom', zoomed)
        svg
          .transition()
          .duration(500)
          .call(
            zoom.transform,
            d3.zoomIdentity
              // .translate(this.viewBoxWidth / 2, this.viewBoxHeight / 2)
              .scale(1)
          )
          .on('end', () => {
            this.isZoomed = false
          })
        node.attr('display', 'inline').attr('opacity', '1')
      }
    })
    // })
  },
  methods: {
    /**
     * 大分類の円クリックハンドラ
     */
    level1CircleClickHandler(event: any) {
      console.log(event)
      const svg = d3.select('#sample')
      const node = svg.selectAll('circle')

      const zoomed = ({ transform }) => {
        node.attr('transform', transform)
      }
      const zoom = d3.zoom().scaleExtent([1, 40]).on('zoom', zoomed)

      svg
        .transition()
        .duration(500)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(0, 0)
            // .translate(this.viewBoxWidth / 2, this.viewBoxHeight / 2)
            .scale(5) // 拡大率（対象の円を画面いっぱいにする）
            .translate(-10, -10)
        )
        .on('end', () => {
          node.attr('opacity', '0')
          this.showChildrenCircles(event)
        })
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
      // console.log(circlePackDataR)
      // const root3 = svg
      //   .append('g')
      //   .attr('class', 'zoomed')
      //   .attr(
      //     'transform',
      //     `translate(${viewBoxWidth / 2},${viewBoxHeight / 2})`
      //   )
      // if (circlePackDataR !== undefined) {
      //   const packCircles = d3.packSiblings(circlePackDataR)
      //   packCircles.map((d) => {
      //     root3
      //       .append('circle')
      //       .attr('cx', d.x)
      //       .attr('cy', d.y)
      //       .attr('r', d.r)
      //       .attr('fill', '#A1887F')
      //   })
      // }
      // root.sum((d) => (d !== undefined ? d.value : 0))

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
          .attr('transform', (d) => `translate(${d.x},${d.y})`)
          .attr('class', 'zoomed')

        const colors = ['#FFE082', '#C5E1A5', '#80CBC4']
        node
          .append('circle')
          .attr('r', (d) => d.r)
          .attr('fill', (d, i) =>
            d.children ? 'rgba(129, 212, 250, 0.3)' : colors[i % 3]
          )
        this.isZoomed = true
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