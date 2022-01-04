import Vuex, {Store} from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import * as regionCofogData from '~/store/regionCofogData'
import { APIResponse } from '~/plugins/api/APIResponse'
import { Drilldown as DrilldownAPI } from '~/plugins/api/Drilldown'
import { Summary as SummaryAPI } from '~/plugins/api/Summary'
import { RegionCofog } from '~/plugins/cofog/RegionCofog'
import { Drilldown } from '~/plugins/cofog/Drilldown'
import { Cofog } from '~/plugins/cofog/Cofog'
import { Summary } from '~/plugins/cofog/Summary'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CofogVuex', () => {
  let store: any

  beforeEach(() => {
    store = new Store(regionCofogData)
  })

  it('action', async () => {
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

    const result = new RegionCofog(
      [
        new Drilldown(
          1502366,
          new Cofog('cofog1', '', 1, '1', 'レクリエーション・文化活動の支援'),
          new Cofog(
            'cofog2',
            'http://openspending.org/yokohama_yosan_percentage/cofog2/05-1',
            1,
            '1-1',
            'レクリエーション・スポーツ・サービス'
          ),
          new Cofog(
            'cofog3',
            'http://openspending.org/yokohama_yosan_percentage/cofog3/',
            1,
            '',
            ''
          ),
          1
        ),
      ],
      new Summary(1, 10000, true, 1502366, 1, 'JPY', 1, '', 1)
    )

    await store.dispatch('setRegionCofogFromAPI')
    expect(store.getters.regionCofogData).toStrictEqual(result)
  })
})
