<template>
  <div class="container my-4">
    <page-title title="データの出所" />
    <contents-block title="データの出所">
      <p>
        このサイトは、{{ budgetName }}の事業名単位のデータを用いています。
      </p>
    </contents-block>
    <contents-block title="どのように可視化に使っているデータの分類を決めているのですか？">
      <p>
        このサイトは、令和２年度の自治体の一般会計当初予算の事業名単位のデータをもとに、各事業が国連のClassification of Functions of Government (COFOG)の第２レイヤー分類のどこに紐づくかを一つ一つ判断して作成しています。
      </p>
    </contents-block>
    <contents-block title="いつの時点のデータを使っているのですか？">
      <p>{{ year }}年度当初予算のデータを使っています。</p>
    </contents-block>
    <contents-block title="このサイト上で税金額はどのように計算されているのですか？">
      <p>
        自分の年間総収入を入力し、単身世帯かそれ以外かを選択すると、給与所得者であるという前提で、年間に支払う年間総税額と一日当たりに支払っている税額が表示されます。一日当たりの税額は10分野に分類されています。また、１０の各分野毎に支払われている税額は、それぞれ、主要な事業予算を担当している税額に細分類されています。
        <br />
        所得控除額は、単身世帯の場合33万円、扶養一人世帯の場合66万円、税負担額は課税対象額の6％と設定しています。また、10分野への税金の配分比率は、つくば市の一般会計全体における10分野への予算配分比率({{
          year
        }}年度)を使っています。
      </p>
    </contents-block>
    <contents-block title="どのようなデータを使っているのですか？">
      <p>
        今回のWhere Does My Money Go? は{{ region }}の{{
          year
        }}年度一般会計予算を対象としています。今後、各自治体や日本政府の一般会計、特別会計、公営企業会計へと対象を広げることも考えています。
      </p>
    </contents-block>
    <contents-block title="私のデータの視覚化をお願いできますか？">
      <p>
        はい、できます。もし、視覚化したいデータをお持ちであれば、COFOGフォーマットに紐付けしたデータセット（Excel）をお問合せにお送りください。
      </p>
    </contents-block>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import ContentsBlock from '@/components/ContentsBlock.vue'

type DataType = {
  /**
   * 自治体名
   */
  region: string
  /**
   * 予算年度
   */
  year: number
  /**
   * 予算名称
   */
  budgetName: string
}

export default Vue.extend({
  components: { PageTitle, ContentsBlock },
  data(): DataType {
    return {
      region: this.$accessor.regionCofogData.regionCofogData.governmentName,
      year: this.$accessor.regionCofogData.regionCofogData.year,
      budgetName: this.$accessor.regionCofogData.regionCofogData.budgetName,
    }
  },
  head() {
    return {
      title: 'データの出所',
    }
  },
})
</script>
