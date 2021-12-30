<template>
  <div class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-md">
        <nuxt-link class="navbar-brand" to="/"
          >WHERE DOES MY MONEY GO?</nuxt-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarSupportedContent" class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link
                to="/"
                :class="($route.path == '/' ? ' active' : '') + ' nav-link'"
                >使途一日あたり</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/bubbletree"
                :class="($route.path == '/bubbletree' ? ' active' : '') + ' nav-link'"
                >使途別予算額</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/about"
                :class="($route.path == '/about' ? ' active' : '') + ' nav-link'"
                >このサイトについて</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/sources"
                :class="($route.path == '/sources' ? ' active' : '') + ' nav-link'"
                >データの出所</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/team"
                :class="($route.path == '/team' ? ' active' : '') + ' nav-link'"
                >開発者</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/links"
                :class="($route.path == '/links' ? ' active' : '') + ' nav-link'"
                >関連サイト</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                to="/contact"
                :class="($route.path == '/contact' ? ' active' : '') + ' nav-link'"
                >お問い合わせ</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-md">
      <p class="small">
        あなたが{{region}}に納めた税金がどこで使われているかをお示しします
      </p>
    </div>
  </div>
</template>

<script lang='ts'>
	import Vue from 'vue'

	export default Vue.extend({
    data() {
      return {
        "region": "つくば市"
      }
    }
	})
</script>
<style>
header {
	color: #000;
  text-align: center;
	padding: 10px;
	background-color: #fff;
}
</style>
