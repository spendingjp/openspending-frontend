<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>データの出所</h3>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col-lg-7">
        <p>
          このサイトは、{{ budgetName }}の事業名単位のデータを用いています。
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <h3>いつの時点のデータを使っているのか？</h3>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col-lg-7">
        <p>{{ year }}年度当初予算のデータを使っています。</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <h3>このサイト上で税金額はどのように計算されているのですか？</h3>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col-lg-7">
        <p>
          自分の年間総収入を入力し、単身世帯かそれ以外かを選択すると、給与所得者であるという前提で、年間に支払う年間総税額と一日当たりに支払っている税額が表示されます。一日当たりの税額は10分野に分類されています。また、１０の各分野毎に支払われている税額は、それぞれ、主要な事業予算を担当している税額に細分類されています。
          <br />
          所得控除額は、単身世帯の場合33万円、扶養一人世帯の場合66万円、税負担額は課税対象額の6％と設定しています。また、10分野への税金の配分比率は、つくば市の一般会計全体における10分野への予算配分比率({{
            year
          }}年度)を使っています。
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <h3>どのようなデータを使っているのですか？</h3>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col-lg-7">
        <p>
          今回のWhere Does My Money Go? は{{ region }}の{{
            year
          }}年度一般会計予算を対象としています。今後、各自治体や日本政府の一般会計、特別会計、公営企業会計へと対象を広げることも考えています。
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
