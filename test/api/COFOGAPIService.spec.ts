import { createLocalVue, mount } from '@vue/test-utils'
import { COFOGAPIService } from '~/plugins/applicationServices/COFOGAPIService'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { Price } from '~/plugins/valueObjects/Price'
import { Cofog } from '~/plugins/valueObjects/Cofog'
import { CofogCode } from '~/plugins/valueObjects/CofogCode'
import { Budget } from '~/plugins/api/Budget'
import { COFOGAPIResponse } from '~/plugins/api/COFOGAPIResponse'

const localVue = createLocalVue()

// ダミーVueコンポーネント（リポジトリのコンストラクタに$axiosを渡すために作成）
const TestComponent = {
  template: '<div />',
}

/* ============================================================
 *  APIレスポンスをオブジェクトに変換するテスト
 * ============================================================ */
describe('APIService', () => {
  it('正常(1レコード)', async () => {
    const wrapper = mount(TestComponent, {
      localVue,
      mocks: {
        $repositories: (_: string) => ({
          Get: () => response,
        }),
      },
    })

    const result: CofogData = {
      amount: Price.create(89713000000.0),
      year: 2021,
      governmentName: 'つくば市',
      budgetName: 'つくば市YYYY年度予算',
      taxList: [
        {
          cofog: new Cofog(
            CofogCode.create({ level1: 1, level2: null, level3: null }),
            '公共サービス全般'
          ),
          amount: Price.create(27738407000.0),
          children: [
            {
              amount: Price.create(25879644000.0),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 1,
                  level3: null,
                }),
                '行政・立法機関、財務・財政、渉外'
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
                    '行政・立法機関(CS)'
                  ),
                },
              ],
            },
          ],
        },
      ],
    }

    const api = new COFOGAPIService(wrapper.vm)
    expect(await api.GetData()).toEqual(result)
  })

  it('正常(複数レコード)', async () => {
    const wrapper = mount(TestComponent, {
      localVue,
      mocks: {
        $repositories: (_: string) => ({
          Get: () => responseMultiRecords,
        }),
      },
    })

    const result: CofogData = {
      amount: Price.create(89713000000.0),
      year: 2021,
      governmentName: 'つくば市',
      budgetName: 'つくば市YYYY年度予算',
      taxList: [
        {
          cofog: new Cofog(
            CofogCode.create({ level1: 1, level2: null, level3: null }),
            '公共サービス全般'
          ),
          amount: Price.create(27738407000.0),
          children: [
            {
              amount: Price.create(25879644000.0),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 1,
                  level3: null,
                }),
                '行政・立法機関、財務・財政、渉外'
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
                    '行政・立法機関(CS)'
                  ),
                },
                {
                  amount: Price.create(7038735000.0),
                  cofog: new Cofog(
                    CofogCode.create({
                      level1: 1,
                      level2: 1,
                      level3: 2,
                    }),
                    '財務・会計(CS)'
                  ),
                },
              ],
            },
          ],
        },
        {
          cofog: new Cofog(
            CofogCode.create({ level1: 5, level2: null, level3: null }),
            '環境保護'
          ),
          amount: Price.create(4908950000.0),
          children: [
            {
              amount: Price.create(2393312000.0),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 5,
                  level2: 1,
                  level3: null,
                }),
                '廃棄物処理'
              ),
              children: [
                {
                  amount: Price.create(2393312000.0),
                  cofog: new Cofog(
                    CofogCode.create({
                      level1: 5,
                      level2: 1,
                      level3: 0,
                    }),
                    '廃棄物管理(CS)'
                  ),
                },
              ],
            },
          ],
        },
      ],
    }

    const api = new COFOGAPIService(wrapper.vm)
    expect(await api.GetData()).toEqual(result)
  })
})

/* ------------------------------------------------------
 * テストデータ（レコード）
 * ------------------------------------------------------ */
const budgets1Record: Budget[] = [
  {
    id: 'bQ8xKBPRoVZLxauxQMJHtx',
    name: '公共サービス全般',
    code: '1',
    amount: 27738407000.0,
    children: [
      {
        id: 'PCgTVjG456QN6YYah7yppH',
        name: '行政・立法機関、財務・財政、渉外',
        code: '1.1',
        amount: 25879644000.0,
        children: [
          {
            id: 'knPerCJWEScxFachLNig4u',
            name: '行政・立法機関(CS)',
            code: '1.1.1',
            amount: 18834640000.0,
            children: null,
          },
        ],
      },
    ],
  },
]
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
  budgets: budgets1Record,
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

/* ------------------------------------------------------
 * テストデータ（複数レコード）
 * ------------------------------------------------------ */
const budgets: Budget[] = [
  {
    id: 'bQ8xKBPRoVZLxauxQMJHtx',
    name: '公共サービス全般',
    code: '1',
    amount: 27738407000.0,
    children: [
      {
        id: 'PCgTVjG456QN6YYah7yppH',
        name: '行政・立法機関、財務・財政、渉外',
        code: '1.1',
        amount: 25879644000.0,
        children: [
          {
            id: 'knPerCJWEScxFachLNig4u',
            name: '行政・立法機関(CS)',
            code: '1.1.1',
            amount: 18834640000.0,
            children: null,
          },
          {
            id: 'QhyXQqQLUerENLXYFmStEu',
            name: '財務・会計(CS)',
            code: '1.1.2',
            amount: 7038735000.0,
            children: null,
          },
        ],
      },
    ],
  },
  {
    id: 'G4YZbRUfF3TYZ4UkvQVELr',
    name: '環境保護',
    code: '5',
    amount: 4908950000.0,
    children: [
      {
        id: 'FPcqveUiNNYB64EBS2dhyz',
        name: '廃棄物処理',
        code: '5.1',
        amount: 2393312000.0,
        children: [
          {
            id: 'Tn4iPasSXbKdY7qjSrApKN',
            name: '廃棄物管理(CS)',
            code: '5.1.0',
            amount: 2393312000.0,
            children: null,
          },
        ],
      },
    ],
  },
]
const responseMultiRecords: COFOGAPIResponse = {
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
  budgets,
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
