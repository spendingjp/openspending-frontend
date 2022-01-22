import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import * as regionCofogData from '~/store/regionCofogData'
import { APIResponse } from '~/plugins/api/APIResponse'
import { Drilldown as DrilldownAPI } from '~/plugins/api/Drilldown'
import { Summary as SummaryAPI } from '~/plugins/api/Summary'
import { Cofog } from '~/plugins/valueObjects/Cofog'
import { CofogCode } from '~/plugins/valueObjects/CofogCode'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { Price } from '~/plugins/valueObjects/Price'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CofogVuex', () => {
  let store: any

  beforeEach(() => {
    store = new Store(regionCofogData)
  })

  xit('action', async () => {
    // リポジトリをモック
    const drilldowns: DrilldownAPI[] = [
      {
        num_entries: 1,
        amount: 1502366,
        cofog1: {
          taxonomy: 'cofog1',
          html_url: '',
          _id: 1,
          name: '1',
          label: 'レクリエーション・文化活動の支援',
        },
        cofog2: {
          taxonomy: 'cofog2',
          html_url:
            'http://openspending.org/yokohama_yosan_percentage/cofog2/05-1',
          _id: 1,
          name: '1-1',
          label: 'レクリエーション・スポーツ・サービス',
        },
        cofog3: {
          taxonomy: 'cofog3',
          html_url: 'http://openspending.org/yokohama_yosan_percentage/cofog3/',
          _id: 1,
          name: '',
          label: '',
        },
      },
    ]
    const summary: SummaryAPI = {
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
    const response: APIResponse = { drilldown: drilldowns, summary }

    store.app = {
      $repositories: () => ({
        Get: () => response,
      }),
    }

    const result: CofogData = {
      amount: Price.create(1502366),
      taxList: [
        {
          amount: Price.create(1502366),
          cofog: new Cofog(CofogCode.create({
            level1: 1,
            level2: 2,
            level3: 3
          }), 'レクリエーション・スポーツ・サービス'),
          children: []
        }
      ],
    }

    await store.dispatch('setRegionCofogFromAPI')
    expect(store.getters.regionCofogData).toStrictEqual(result)
  })
})
