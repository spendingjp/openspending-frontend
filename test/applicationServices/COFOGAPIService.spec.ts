import { createLocalVue, mount } from '@vue/test-utils'
import { COFOGAPIService } from '~/plugins/applicationServices/COFOGAPIService'
import { Drilldown as DrilldownAPI } from '~/plugins/api/Drilldown'
import { Summary as SummaryAPI } from '~/plugins/api/Summary'
import { APIResponse } from '~/plugins/api/APIResponse'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { Price } from '~/plugins/valueObjects/Price'
import { Cofog } from '~/plugins/valueObjects/Cofog'
import { CofogCode } from '~/plugins/valueObjects/CofogCode'

const localVue = createLocalVue()

// ダミーVueコンポーネント（リポジトリのコンストラクタに$axiosを渡すために作成）
const TestComponent = {
  template: '<div />',
}

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
      amount: Price.create(1502366),
      taxList: [
        {
          cofog: new Cofog(
            CofogCode.create({ level1: 1, level2: null, level3: null }),
            'レクリエーション・文化活動の支援'
          ),
          amount: Price.create(1502366),
          children: [
            {
              amount: Price.create(1502366),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 1,
                  level3: 1,
                }),
                'レクリエーション・スポーツ・サービス'
              ),
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
      amount: Price.create(2766027),
      taxList: [
        {
          cofog: new Cofog(
            CofogCode.create({ level1: 1, level2: null, level3: null }),
            'レクリエーション・文化活動の支援'
          ),
          amount: Price.create(2238741),
          children: [
            {
              amount: Price.create(1502366),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 1,
                  level3: 1,
                }),
                'レクリエーション・スポーツ・サービス'
              ),
            },
            {
              amount: Price.create(736375),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 2,
                  level3: 1,
                }),
                'レクリエーション・文化関連政策'
              ),
            },
          ],
        },
        {
          cofog: new Cofog(
            CofogCode.create({ level1: 2, level2: null, level3: null }),
            '安全・安心の確保'
          ),
          amount: Price.create(527286),
          children: [
            {
              amount: Price.create(527286),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 2,
                  level2: 1,
                  level3: 1,
                }),
                '危機管理'
              ),
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
const drilldowns1Record: DrilldownAPI[] = [
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
      html_url: 'http://openspending.org/yokohama_yosan_percentage/cofog2/05-1',
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
const summary1Record: SummaryAPI = {
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
const response: APIResponse = {
  drilldown: drilldowns1Record,
  summary: summary1Record,
}

/* ------------------------------------------------------
 * テストデータ（複数レコード）
 * ------------------------------------------------------ */
const drilldownsRecords: DrilldownAPI[] = [
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
      html_url: 'http://openspending.org/yokohama_yosan_percentage/cofog2/05-1',
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
  {
    num_entries: 1,
    amount: 736375,
    cofog1: {
      taxonomy: 'cofog1',
      html_url: '',
      _id: 1,
      name: '1',
      label: 'レクリエーション・文化活動の支援',
    },
    cofog2: {
      taxonomy: 'cofog2',
      html_url: 'http://openspending.org/yokohama_yosan_percentage/cofog2/05-1',
      _id: 2,
      name: '1-2',
      label: 'レクリエーション・文化関連政策',
    },
    cofog3: {
      taxonomy: 'cofog3',
      html_url: 'http://openspending.org/yokohama_yosan_percentage/cofog3/',
      _id: 1,
      name: '',
      label: '',
    },
  },
  {
    num_entries: 1,
    amount: 527286,
    cofog1: {
      taxonomy: 'cofog1',
      html_url: '',
      _id: 2,
      name: '2',
      label: '安全・安心の確保',
    },
    cofog2: {
      taxonomy: 'cofog2',
      html_url: 'http://openspending.org/yokohama_yosan_percentage/cofog2/05-1',
      _id: 1,
      name: '2-1',
      label: '危機管理',
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
const summaryRecords: SummaryAPI = {
  num_drilldowns: 2,
  pagesize: 10000,
  cached: true,
  amount: 2766027,
  pages: 1,
  currency: { amount: 'JPY' },
  num_entries: 2,
  cache_key: '',
  page: 1,
}
const responseMultiRecords: APIResponse = {
  drilldown: drilldownsRecords,
  summary: summaryRecords,
}
