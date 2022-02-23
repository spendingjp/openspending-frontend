<template>
  <div class="container mb-4 mt-3">
    <page-title title="このサイトについて" />
    <contents-block title="Where Does My Money Go? とは何ですか？">
      <p>
        <span class="fw-bold">Where Does My Money Go?</span> は、納税者である国民一人ひとりが、支払っている税金の使われ方を具体的に理解し、税金の使われ方を決める当事者として責任ある意見を述べることを手助けすることを目的としています。私達は、国民一人ひとりが、公共サービスにおける受益と負担の関係を数字で理解したうえで、私ならこう税金を使って欲しいという具体的で責任のある意見を述べることができるようなることが、日本の財政を健全化させ、日本を新たな成長へと導く近道に違いないと考えています。
      </p>
      <p>
        <span class="fw-bold">Where Does My Money Go?</span> β版（2012年7月1日稼働）は、つくば市民がつくば市に納めている市税を対象として構築したものです。自分の年間総収入をスライドで設定し、単身世帯か扶養一人世帯かを選択すると、給与所得者であるという前提で、つくば市に納めている市税年総額と10分野毎に一日当たり支払っている市税額が表示されます。所得控除額は、単身世帯の場合33万円、扶養一人世帯の場合66万円、市税負担額は課税対象額の6％と設定しています。また、10分野への税金の配分比率は、つくば市の一般会計全体における10分野への予算配分比率(24年1月1日現在)を使っています。
      </p>
      <p>
        現在このβ版は、つくば市税だけを対象としたものですが、今後、利用者の皆さんや日本政府や全国の自治体の皆さんのご意見、ご要望を踏まえて、特別会計や公営企業会計も含めたり、市債発行額・償還額を含めたり、神奈川県税や国税を含めたりなど、ニーズに応じて、どんどん成長させて行きたいと考えております。是非、皆様からの忌憚のないご意見、ご要望、ご指摘をお願いいたします。
      </p>
      <p>
        なお、このサイトは、公共データのオープン化によって、地域社会を変え、日本社会を変え、世界にも影響を与え、貢献して行こうという思いを持って集まったメンバーによって構築、運営されています。
        <nuxt-link to="/team">開発者の一覧</nuxt-link>
      </p>
    </contents-block>
    <contents-block title="どうやって連絡を取ればいいですか？">
      <p>
        <nuxt-link to="/contact">コンタクトフォーム</nuxt-link>
        からご連絡ください。
      </p>
    </contents-block>
    <contents-block title="このサイトは、どのような経緯で生まれたのですか？">
      <p>
        Where Does My Money Go? はイギリスの Where Does My Money Go? を参考に、日本でも公共データのオープン化によって、地域社会を変え、日本社会を変え、世界にも影響を与え、貢献して行こうという思いを持って集まったメンバーによって、当初2013年に構築され、運営されていました。2015年6月以降、機能停止していましたが、Code for JapanのSocial Hack Day （2021年7月24日）に集まったメンバーによって再構築されました。
      </p>
    </contents-block>
    <contents-block title="誰がこのサイトを運営しているのですか？">
      <p>
        このプロジェクトは市民の手で運営されているのが最大の特徴であり、今後、更になるデータの収集、分析を実施したいと考えています。ご関心を持った方は是非、ご参加下さい。問い合わせ先はコンタクトフォームからお願いいたします。
      </p>
    </contents-block>
    <contents-block title="つくば市だけなのですか？">
      <p>
        今後、各地の有志の手により、つくば市以外にもサイトが立ち上がっていくことが期待されます。
      </p>
    </contents-block>
    <contents-block title="このプロジェクトは、何らかの政治、宗教または特定の団体との関係がありますか？">
      <p>
        <span class="fw-bold">Where Does My Money Go?</span> はつくば市税がどのように使われたかを示すサイトであり、一切の政治・宗教・特定の団体とは関係がありません。また、つくば市税を何に使うべきで、何に使うべきでないのかを主張するサイトでもありません。今回のプロジェクトの大きな目的は私たちが納めた税金がどのように使われているかを知ることであり、どのように使うべきかをコメントするものではありません。私たちは <span class="fw-bold">Where Does My Money Go?</span> が利用するすべての人にとって使いやすいものであることを願っています。
      </p>
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
      title: 'このサイトについて',
    }
  },
})
</script>
