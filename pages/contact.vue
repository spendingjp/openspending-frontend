<template>
  <div class="container my-4">
    <page-title title="お問い合わせ" />
    <contents-block title="Forum">
      <p>
        Slackに開発者用のチャンネルがありますので、開発に関する質問やディスカッションはこちらでお願いします。<br />
        <a
          href="https://cfjslackin.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >Code for Japan の Slack ワークスペース</a
        >の、#proj-wdmmg-dev
      </p>
    </contents-block>
    <contents-block title="Contact">
      <iframe
        class="contact-form"
        src="https://docs.google.com/a/georepublic.de/spreadsheet/embeddedform?formkey=dGw3ZTNvYjRkRnFWb3JDUDJuNExpWFE6MQ"
      >Loading...</iframe>
    </contents-block>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import ContentsBlock from '@/components/ContentsBlock.vue'

export default Vue.extend({
  components: { PageTitle, ContentsBlock },
  head() {
    return {
      title: 'お問い合わせ',
    }
  },
})
</script>

<style lang="scss" scoped>
.contact-form {
  width: 100%;
  height: 500px;
}
</style>
