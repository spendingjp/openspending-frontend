import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { APIResponse } from '@/plugins/api/APIResponse'
import { Drilldown } from '../api/Drilldown'
import { Summary } from '../api/Summary'

export class CofogRepository {
  private readonly axios: NuxtAxiosInstance
  constructor($axios: NuxtAxiosInstance) {
    this.axios = $axios
  }

  public async Get() {
    // console.log("[リポジトリ]API実行")
    const uri = '/api' // nuxt.config.tsで設定したbaseUrlに続くURLを指定可能
    const apiResponse = await this.axios.$get<APIResponse>(uri)
    // const drilldowns:Drilldown[] = [
    //   {
    //     num_entries: 1,
    //     amount: 1502366,
    //     cofog1 :{
    //       "taxonomy": "cofog1",
    //       "html_url": "",
    //       "_id": 1,
    //       "name": "1",
    //       "label": "レクリエーション・文化活動の支援"
    //     },
    //     cofog2: {
    //       "taxonomy": "cofog2",
    //       "html_url": "http://openspending.org/yokohama_yosan_percentage/cofog2/05-1",
    //       "_id": 1,
    //       "name": "1-1",
    //       "label": "レクリエーション・スポーツ・サービス"
    //     },
    //     cofog3: {
    //       "taxonomy": "cofog3",
    //       "html_url": "http://openspending.org/yokohama_yosan_percentage/cofog3/",
    //       "_id": 1,
    //       "name": "",
    //       "label": ""
    //     },
    //   },
    // ]
    // const summary: Summary = {
    //   num_drilldowns: 1,
    //   pagesize: 10000,
    //   cached: true,
    //   amount: 1502366,
    //   pages: 1,
    //   currency: { amount: 'JPY' },
    //   num_entries: 1,
    //   cache_key: '',
    //   page: 1,
    // }
    // const apiResponse: APIResponse = {drilldown: drilldowns, summary}
    if (this.isValidAPIResponse(apiResponse)) {
      return apiResponse
    } else {
      throw new Error('APIレスポンスが異常')
    }
  }

  /**
   * APIレスポンスが想定通りかを判断する
   * @param json APIレスポンス
   * @returns 想定通りならtrue, 異常ならfalse
   */
  private isValidAPIResponse(json: any): json is APIResponse {
    if (json.drilldown === undefined || json.summary === undefined) {
      return false
    }

    const drilldown = json.drilldown
    if (Array.isArray(drilldown)) {
      let isInvalidDrilldown = drilldown.some(item => {
        if (item.num_entries === undefined
          || item.amount === undefined
          || item.cofog1 === undefined
          || item.cofog1.taxonomy === undefined
          || item.cofog1.html_url === undefined
          || item.cofog1._id === undefined
          || item.cofog1.name === undefined
          || item.cofog1.label === undefined
          || item.cofog2 === undefined
          || item.cofog2.taxonomy === undefined
          || item.cofog2.html_url === undefined
          || item.cofog2._id === undefined
          || item.cofog2.name === undefined
          || item.cofog2.label === undefined
          || item.cofog3 === undefined
          || item.cofog3.taxonomy === undefined
          || item.cofog3.html_url === undefined
          || item.cofog3._id === undefined
          || item.cofog3.name === undefined
          || item.cofog3.label === undefined) {
            // drilldownの要素に想定通りでないものがある
          return true
        }
        return false
      })

      if (drilldown.length === 0) {

        // 要素数0の場合各要素のチェックスはスキップされるが、異常としてマーク
        isInvalidDrilldown = true
      }

      if (isInvalidDrilldown) {
        // drildownの各要素が想定通りでない
        return false;
      }
    } else {
      // drildownが配列でない
      return false
    }

    if (json.summary.num_drilldowns === undefined
      || json.summary.pagesize === undefined
      || json.summary.cached === undefined
      || json.summary.amount === undefined
      || json.summary.pages === undefined
      || json.summary.currency === undefined
      || json.summary.currency.amount === undefined
      || json.summary.num_entries === undefined
      || json.summary.cache_key === undefined
      || json.summary.page === undefined) {
        // summaryの各要素が想定通りでない
      return false
    }
    return true
  }
}