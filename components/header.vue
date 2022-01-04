<template>
  <div>
    <nav class="navbar navbar-expand-lg header navbar-dark">
      <div class="container-md">
        <nuxt-link class="navbar-brand fs-sm-1" to="/"
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

    <div class="container-fluid sub-title">
    <div class="container">
      <div class="row">
        <div class="col-5 d-none d-sm-inline">
          <small>税金はどこへ行った？</small>
        </div>
        <div class="col-sm-7 col-12 text-end">
          <small>あなたが <span class="text-primary">つくば市</span> に納めた税金がどこで使われているかをお示しします</small>
        </div>
        
      </div>
      </div>
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
<style lang='scss' scoped>
.header {
	background-color: $info;
}

a.navbar-brand {
  color: #BF9D73;
  font-weight: bold;
  font-size: 5vmin;
  @media (min-width: 640px) {
    font-size: 18px * 1.25;
  }

  &:hover {
    color: #fefefe;
  }
}

.sub-title {
  background-color:#0F1640;
  color: #0F1640;
  font-weight: bold;
  padding: 3px 0;
  border-bottom: #0F1640 solid 3px;

  & div {
    color: #fefefe;
  }
}

#navbarSupportedContent a {
  color:#F2F2F2;
  font-weight: bold;
}

#navbarSupportedContent a.active {
  color:#F2F2F2;
  font-weight: bold;
  border-bottom: #BF9D73 solid 2px;
  padding-bottom: 2px;
}

#navbarSupportedContent a.active:hover {
  border: none;
}

#navbarSupportedContent a:hover {
  color:#BF9D73;
}

</style>
