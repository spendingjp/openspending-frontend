<template>
  <div class="container my-4">
    <page-title title="開発者" />
    <contents-block title="Core Team">
      <ul>
        <li>
          川島 宏一(Hiroichi Kawashima),
          <a
            href="https://twitter.com/hiroichi_k"
            target="_blank"
            rel="noopener noreferrer"
          >
            @hiroichi_k</a
          >
          / Coordinator
        </li>
        <li>
          関 治之(Hal Seki)<a
          href="https://twitter.com/hal_sk"
          target="_blank"
          rel="noopener noreferrer"
        >@hal_sk</a
        > / Developer
        </li>
        <li>
          おそけん<a
          href="https://twitter.com/oso_ken"
          target="_blank"
          rel="noopener noreferrer"
        >@oso_ken</a
        > / Developer
        </li>
        <li>秋田 / Developer</li>
        <li>大瀧 雄貴(Yuuki Ootaki) / Developer</li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=100013297352138"
            target="_blank"
            rel="noopener noreferrer"
          >信夫 咲希</a>
          / Organize data and guidelines
        </li>
        <li>
          高野 光弘(TAKANO Mitsuhiro a.k.a. <a
          href="https://twitter.com/takano32"
          target="_blank"
          rel="noopener noreferrer"
        >@takano32</a>)
          / Developer
        </li>
        <li>
          <a
            href="https://twitter.com/homata"
            target="_blank"
            rel="noopener noreferrer"
          >小俣 博司</a>
          / Research data
        </li>
        <li>今村 かずき / Developer</li>
      </ul>
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
      title: '開発者',
    }
  },
})
</script>
