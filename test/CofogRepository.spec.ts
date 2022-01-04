import { createLocalVue, mount } from '@vue/test-utils'
import Response1RecordJSON from './sampleResponse_1record.json'
import { CofogRepository } from '@/plugins/repositories/CofogRepository'
import { APIResponse } from '~/plugins/api/APIResponse'
import { Drilldown } from '~/plugins/api/Drilldown'
import { Summary } from '~/plugins/api/Summary'

const localVue = createLocalVue()

// ダミーVueコンポーネント（リポジトリのコンストラクタに$axiosを渡すために作成）
const TestComponent = {
  template: '<div />',
}

describe('CofogRepository', () => {
  it('正常', async () => {
    // API返却値をモック
    const wrapper = mockAxiosGet(
      () =>
        new Promise((resolve) => {
          resolve(Response1RecordJSON)  // 正常なレスポンス
        })
    )

    // 期待値：APIレスポンスをオブジェクトに変換成功
    const drilldowns:Drilldown[] = [
      {
        num_entries: 1,
        amount: 1502366,
        cofog1 :{
          "taxonomy": "cofog1",
          "html_url": "",
          "_id": 1,
          "name": "1",
          "label": "レクリエーション・文化活動の支援"
        },
        cofog2: {
          "taxonomy": "cofog2",
          "html_url": "http://openspending.org/yokohama_yosan_percentage/cofog2/05-1",
          "_id": 1,
          "name": "1-1",
          "label": "レクリエーション・スポーツ・サービス"
        },
        cofog3: {
          "taxonomy": "cofog3",
          "html_url": "http://openspending.org/yokohama_yosan_percentage/cofog3/",
          "_id": 1,
          "name": "",
          "label": ""
        },
      },
    ]
    const summary: Summary = {
      num_drilldowns: 1,
      pagesize: 10000,
      cached: true,
      amount: 1502366,
      pages: 1,
      currency: { amount: 'JPY' },
      num_entries: 1,
      cache_key: '',
      page: 1,
    }
    const result: APIResponse = {drilldown: drilldowns, summary}

    // 処理実行
    const repo = new CofogRepository(wrapper.vm.$axios)
    expect(await repo.Get()).toEqual(result)
  })

  it('異常', async () => {
    // API返却値をモック
    const wrapper = mockAxiosGet(
      () =>
        new Promise((resolve) => {
          resolve({drilldown: '',summary: {}})    // drilldownが配列でない、summaryが空なのでエラー
        })
    )

    // 処理実行
    const repo = new CofogRepository(wrapper.vm.$axios)
    await expect(repo.Get()).rejects.toThrow(Error)
  })
})

/**
 * axiosモック
 * @param func レスポンス取得時の処理
 * @returns Vueコンポーネントラッパー
 */
function mockAxiosGet(func: Function) {
  return mount(TestComponent, {
    localVue,
    mocks: {
      // $reposiotories: (_: string) => ({
      //   get: () => 'test',
      // }),
      $axios: {
        $get: func,
        // () => {
        //   return new Promise((resolve) => {
        //     resolve(ResponseJSON)
        //   })
        // }
      },
    },
  })
}
