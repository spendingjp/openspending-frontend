<template>
  <footer class="container-fluid">
    <div class="container footer">
      <div class="row inner">
        <div class="col">
          <p>
            Where Does My Money Go? (日本語版 ver.1.0.) は、イギリスの Open
            Knowledge Foundation が開発した Where Does My Money Go? (英語版)
            をベースに開発されています。使われているデータはつくば市財政局財政課が作成している平成24年度一般会計予算のデータをもとにしています。Where
            Does My Money Go?
            プロジェクトは、公共データのオープン化を進める有志に支えられています。
          </p>

          <div class="row">
            <ul class="footer-links span4 pull-left col-12 col-sm-4 px-4">
              <li>
                <a href="http://wheredoesmymoneygo.org"
                  >Where Does My Money Go?</a
                >
              </li>
              <li><a href="http://openspending.org">OpenSpending</a></li>
              <li><a href="http://thedatahub.org">TheDataHub</a></li>
              <li><a href="http://okfnlabs.org">OKFN Labs</a></li>
              <!--li><a href="http://yourtopia.net">YourTopia</a></li-->
            </ul>
            <ul class="footer-links span4 pull-left col-12 col-sm-4 px-4">
              <li><a href="team.html">Core team</a></li>
              <li><a href="sources.html">Data sources</a> used on this site</li>
              <!--li><a href="http://openspending.org/help/contact.html">Get in touch</a> and contribute</li-->
              <li>
                <a href="https://github.com/orezeni/orezeni.github.com">Code</a>
                and making your own
              </li>
              <!--li><a href="http://okfn.org/privacy-policy/">Privacy Policy</a></li-->
            </ul>

            <p class="col-12 col-sm-4">
              All
              <a href="http://creativecommons.org/licenses/by/3.0/">content</a>,
              <a href="http://www.gnu.org/licenses/agpl.html">code</a>
              and
              <a href="http://opendatacommons.org/licenses/odbl/">data</a> is
              openly licensed in accordance with the
              <a href="http://opendefinition.org/">open definition</a>.
              <br />
              <a href="http://opendefinition.org"
                ><img
                  src="http://assets.okfn.org/images/ok_buttons/od_80x15_blue.png"
                  alt="Open Content"
              /></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 50 px;
  padding: 0;
  background: #222222;
}

.footer {
  background: url('/okfn-watermark.png') top right no-repeat;
}

footer .inner {
  background: url('/footer-bevel.png') top repeat-x;
  padding: 10px 0 30px 0;
  color: #fff;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
  min-height: 190px;
}

footer a,
footer a:hover {
  color: #aeebdf;
}

.footer-links {
  list-style-type: disc;
}
</style>