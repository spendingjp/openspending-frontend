<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>Forum</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <p>
          Slackに開発者用のチャンネルがありますので、開発に関する質問やディスカッションはこちらでお願いします。<br />
          <a
            href="https://cfjslackin.herokuapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            >Code for Japan の Slack ワークスペース</a
          >の、#proj-wdmmg-dev
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <h3>Contact</h3>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <iframe
          id="contact-form"
          src="https://docs.google.com/a/georepublic.de/spreadsheet/embeddedform?formkey=dGw3ZTNvYjRkRnFWb3JDUDJuNExpWFE6MQ"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          >Loading...</iframe
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head() {
    return {
      title: 'お問い合わせ',
    }
  },
})
</script>

<style lang="scss">
#contact-form {
  width: 100%;
  height: 500px;
}
</style>