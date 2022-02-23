<template>
  <footer class="container-fluid">
    <div class="container footer py-4">
      <div class="row inner">
        <div class="col-12 col-sm-4 px-4">
          <p class="small description">
            Where Does My Money Go? (日本語版 ver.0.9) は、イギリスの
            OpenKnowledge Foundation が開発した Where Does My Money Go? (英語版)
            をベースに開発されています。使われているデータは{{
              region
            }}が作成している{{
              year
            }}年度一般会計予算のデータをもとにしています。Where Does My Money
            Go?
            プロジェクトは、公共データのオープン化を進める有志に支えられています。
          </p>
        </div>

        <ul class="footer-links span4 pull-left col-12 col-sm-4 px-4">
          <li>
            <a href="http://wheredoesmymoneygo.org">Where Does My Money Go?</a>
          </li>
          <li><a href="http://openspending.org">OpenSpending</a></li>
          <li><a href="http://thedatahub.org">TheDataHub</a></li>
          <li><a href="http://okfnlabs.org">OKFN Labs</a></li>
        </ul>

        <ul class="footer-links span4 pull-left col-12 col-sm-4 px-4">
          <li><nuxt-link to="/team">Core team</nuxt-link></li>
          <li>
            <nuxt-link to="/sources">Data sources</nuxt-link> used on this site
          </li>
          <li>
            <a href="https://github.com/spendingjp/openspending-frontend"
              >Code</a
            >
            and making your own
          </li>
        </ul>
      </div>

      <p class="px-2">
        All
        <a href="http://creativecommons.org/licenses/by/3.0/">content</a>,
        <a href="http://www.gnu.org/licenses/agpl.html">code</a>
        and
        <a href="http://opendatacommons.org/licenses/odbl/">data</a> is openly
        licensed in accordance with the
        <a href="http://opendefinition.org/">open definition</a>.
        <a href="http://opendefinition.org"
          ><img
            src="http://assets.okfn.org/images/ok_buttons/od_80x15_blue.png"
            alt="Open Content"
        /></a>
      </p>
    </div>
  </footer>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      region: this.$accessor.regionCofogData.regionCofogData.governmentName,
      year: this.$accessor.regionCofogData.regionCofogData.year,
    }
  },
})
</script>

<style scoped>
footer {
  margin-top: 50px;
  background-color: #0f1640;
  color: #fefefe;
}

.footer {
  background: url('/okfn-watermark.png') top right no-repeat;
}

footer .inner {
  padding: 10px 0 30px 0;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
  min-height: 190px;
}

footer a,
footer a:hover {
  color: #bf9d73;
  font-weight: bold;
}

.footer-links {
  list-style-type: none;
}

.footer-links a {
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.description {
  text-align: justify;
  text-justify: inter-ideograph;
}
</style>