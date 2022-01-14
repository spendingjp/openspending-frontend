<template>
  <div class="contaneir">
    <div class="row">
      <div id="test-title">test</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '@mszu/pixi-ssr-shim' // pixi.jsのself is not definedエラー対策
import * as PIXI from 'pixi.js'

export default Vue.extend({
  head() {
    return {
      title: '使途予算別',
    }
  },
  mounted() {
    const target = document.getElementById('test-title')
    const app = new PIXI.Application({})

    if (target !== null) {
      target.appendChild(app.view)
      app.renderer.resize(target.clientWidth, target.clientHeight)
    }

    const obj = new PIXI.Graphics()
    obj.beginFill(0xff0000)
    obj.drawRect(0, 0, 200, 100)
    app.stage.addChild(obj)
  },
})
</script>