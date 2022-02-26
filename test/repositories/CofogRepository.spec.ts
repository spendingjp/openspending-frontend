import { createLocalVue, mount } from '@vue/test-utils'
import Response1RecordJSON from './sampleResponse_1record.json'
import { CofogRepository } from '@/plugins/repositories/CofogRepository'
import { Budget } from '~/plugins/api/Budget'
import { COFOGAPIResponse } from '~/plugins/api/COFOGAPIResponse'

const localVue = createLocalVue()

// ダミーVueコンポーネント（リポジトリのコンストラクタに$axiosを渡すために作成）
const TestComponent = {
  template: '<div />',
}

/* ============================================================
 *  APIレスポンスを取得するテスト
 * ============================================================ */
describe('CofogRepository', () => {
  it('正常', async () => {
    // API返却値をモック
    const wrapper = mockAxiosGet(
      () =>
        new Promise((resolve) => {
          resolve(Response1RecordJSON) // 正常なレスポンス
        })
    )

    // 期待値：APIレスポンスをオブジェクトに変換成功
    const result: COFOGAPIResponse = {
      budgets: validBudgets,
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
        primaryColorCode: null,
        secondaryColorCode: null,
        createdAt: '2022-02-04T15:47:03.420321Z',
        updatedAt: '2022-02-04T15:47:03.425683Z',
      },
      totalAmount: 89713000000.0,
      sourceBudget: {
        id: 'SDanT82RwYPnfPmyw2tD9j',
        name: 'つくば市2021年度予算',
        slug: 'tsukuba-shi-2021-nendo-yosan',
        year: 2021,
        subtitle: '',
        classificationSystem: 'KkbyhYBrhD998uii4WgWTq',
        government: 'oRgxRSueiNbNCmW3LkDN8E',
        createdAt: '2022-02-13T05:02:17.856000Z',
        updatedAt: '2022-02-13T05:02:17.859000Z',
      },
    }

    // 処理実行
    const repo = new CofogRepository(wrapper.vm)
    expect(await repo.Get()).toEqual(result)
  })

  it('異常', async () => {
    // API返却値をモック
    const wrapper = mockAxiosGet(
      () =>
        new Promise((resolve) => {
          resolve({
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
            budgets: [], // budgetsが空
            sourceBudget: {
              id: 'SDanT82RwYPnfPmyw2tD9j',
              name: 'つくば市2021年度予算',
              slug: 'tsukuba-shi-2021-nendo-yosan',
              year: 2021,
              subtitle: '',
              classificationSystem: 'KkbyhYBrhD998uii4WgWTq',
              government: 'oRgxRSueiNbNCmW3LkDN8E',
              createdAt: '2022-02-13T05:02:17.856000Z',
              updatedAt: '2022-02-13T05:02:17.859000Z',
            },
          })
        })
    )

    // 処理実行
    const repo = new CofogRepository(wrapper.vm.$nuxt)
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
      $axios: {
        $get: func,
      },
    },
  })
}

/* =============================================================
 *  テストデータ
 * ============================================================= */
// ---------------- 正常 ----------------
const validBudgets: Budget[] = [
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
          {
            id: 'P8ReRpWwzspCKnvyAeurbF',
            name: '対外関係(CS)',
            code: '1.1.3',
            amount: 6269000.0,
            children: null,
          },
        ],
      },
      {
        id: 'BNugKJHPkcweshFc9cqi2b',
        name: '対外経済援助',
        code: '1.2',
        amount: 0,
        children: [
          {
            id: '2vfndZUxqqzdKXRFFgt7Na',
            name: '開発途上国および移行国に対する経済援助(CS)',
            code: '1.2.1',
            amount: 0,
            children: null,
          },
          {
            id: 'BFQaGFk3Vwm7GwBVry6xSh',
            name: '国際機関を通じた経済援助(CS)',
            code: '1.2.2',
            amount: 0,
            children: null,
          },
        ],
      },
      {
        id: '2ht79XTzT3b4Nz4R9oKGJm',
        name: '国防',
        code: '2',
        amount: 0,
        children: [
          {
            id: 'KDHogTtXqyae57AeVgcNM8',
            name: '軍事的防衛',
            code: '2.1',
            amount: 0,
            children: [
              {
                id: 'nSi9WB7KQxpPqNwoYzXpaQ',
                name: '軍事的防衛(CS)',
                code: '2.1.0',
                amount: 0,
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
]
