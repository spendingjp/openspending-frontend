import Vuex, { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import * as regionCofogData from '~/store/regionCofogData'
import { Cofog } from '~/plugins/valueObjects/Cofog'
import { CofogCode } from '~/plugins/valueObjects/CofogCode'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { Price } from '~/plugins/valueObjects/Price'
import { COFOGAPIResponse } from '~/plugins/api/COFOGAPIResponse'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CofogVuex', () => {
  let store: any

  beforeEach(() => {
    store = new Store(regionCofogData)
  })

  it('action', async () => {
    // リポジトリをモック
    store.app = {
      $repositories: () => ({
        Get: () => response,
      }),
    }

    const result: CofogData = {
      amount: Price.create(89713000000.0),
      year: 2021,
      governmentName: 'つくば市',
      budgetName: 'つくば市YYYY年度予算',
      taxList: [
        {
          amount: Price.create(27738407000.0),
          cofog: new Cofog(
            CofogCode.create({
              level1: 1,
              level2: null,
              level3: null,
            }),
            '公共サービス全般',
            'XX2emyJp3FRYN6qmcUbpwW',
          ),
          children: [
            {
              amount: Price.create(25879644000.0),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 1,
                  level3: null,
                }),
                '行政・立法機関、財務・財政、渉外',
                'XX2emyJp3FRYN6qmcUbpwW',
              ),
              children: [
                {
                  amount: Price.create(18834640000.0),
                  cofog: new Cofog(
                    CofogCode.create({
                      level1: 1,
                      level2: 1,
                      level3: 1,
                    }),
                    '行政・立法機関(CS)',
                    'XX2emyJp3FRYN6qmcUbpwW',
                  ),
                },
              ],
            },
          ],
        },
      ],
    }

    await store.dispatch('setRegionCofogFromAPI')
    expect(store.getters.regionCofogData).toStrictEqual(result)
  })
})

const response: COFOGAPIResponse = {
  id: 'CfW8FPjJmb4aaNLRB2ZQP2',
  name: 'つくば市COFOG2021',
  subtitle: '',
  slug: 'tsukuba-shi-cofog2021',
  year: 2021,
  createdAt: '2022-02-04T15:48:00.901211Z',
  updatedAt: '2022-02-04T15:48:00.902603Z',
  government: {
    id: 'NUXQj6smbHytL3radZuMQe',
    name: 'つくば市',
    slug: 'tsukuba-shi',
    latitude: 36.0825081,
    longitude: 140.1107132,
    createdAt: '2022-02-04T15:47:03.420321Z',
    updatedAt: '2022-02-04T15:47:03.425683Z',
  },
  totalAmount: 89713000000.0,
  budgets: [
    {
      id: 'bQ8xKBPRoVZLxauxQMJHtx',
      name: '公共サービス全般',
      code: '1',
      iconId: 'XX2emyJp3FRYN6qmcUbpwW',
      amount: 27738407000.0,
      children: [
        {
          id: 'PCgTVjG456QN6YYah7yppH',
          name: '行政・立法機関、財務・財政、渉外',
          code: '1.1',
          iconId: 'XX2emyJp3FRYN6qmcUbpwW',
          amount: 25879644000.0,
          children: [
            {
              id: 'knPerCJWEScxFachLNig4u',
              name: '行政・立法機関(CS)',
              code: '1.1.1',
              iconId: 'XX2emyJp3FRYN6qmcUbpwW',
              amount: 18834640000.0,
              children: null,
            },
          ],
        },
      ],
    },
  ],
  sourceBudget: {
    id: 'SDanT82RwYPnfPmyw2tD9j',
    name: 'つくば市YYYY年度予算',
    slug: 'tsukuba-shi-2021-nendo-yosan',
    year: 2021,
    subtitle: '',
    classificationSystem: 'KkbyhYBrhD998uii4WgWTq',
    government: 'oRgxRSueiNbNCmW3LkDN8E',
    createdAt: '2022-02-13T05:02:17.856000Z',
    updatedAt: '2022-02-13T05:02:17.859000Z',
  },
}
