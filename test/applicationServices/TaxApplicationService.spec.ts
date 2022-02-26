import { createLocalVue, mount } from '@vue/test-utils'
import { TaxApplicationService } from '~/plugins/applicationServices/TaxApplicationService'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { DailyBread } from '~/plugins/dataTransferObjects/dailyBreadData'
import { Person } from '~/plugins/entities/Person'
import { Cofog } from '~/plugins/valueObjects/Cofog'
import { CofogCode } from '~/plugins/valueObjects/CofogCode'
import { HOME_TYPE } from '~/plugins/valueObjects/HomeType'
import { Price } from '~/plugins/valueObjects/Price'

const localVue = createLocalVue()

// ダミーVueコンポーネント（リポジトリのコンストラクタに$axiosを渡すために作成）
const TestComponent = {
  template: '<div />',
}

describe('DailyBreadService', () => {
  it('正常', () => {
    const wrapper = mount(TestComponent, {
      localVue,
      mocks: {
        $repositories: (_: string) => ({
          Get: (): CofogData => inputCofogData,
        }),
      },
    })

    const person = new Person({
      salary: Price.create(3000000),
      homeType: HOME_TYPE.SINGLE,
    })

    const result: DailyBread = {
      amount: (3000000 - 330000) * 0.06,
      taxList: [
        {
          amount: ((3000000 - 330000) * 0.06 * 8000) / 10000 / 365,
          name: 'カテゴリ1',
          iconId: 'XX2emyJp3FRYN6qmcUbpwW',
          cofogCode: '1.0.0',
          children: [
            {
              amount: ((3000000 - 330000) * 0.06 * 2000) / 10000 / 365,
              cofogCode: '1.1.0',
              name: 'サブカテゴリ1-1',
              iconId: 'XX2emyJp3FRYN6qmcUbpwW',
              children: [
                {
                  amount: ((3000000 - 330000) * 0.06 * 1500) / 10000 / 365,
                  cofogCode: '1.1.1',
                  name: 'サブカテゴリ1-1-1',
                  iconId: 'XX2emyJp3FRYN6qmcUbpwW',
                  children: null,
                },
                {
                  amount: ((3000000 - 330000) * 0.06 * 500) / 10000 / 365,
                  cofogCode: '1.1.2',
                  name: 'サブカテゴリ1-1-2',
                  iconId: 'XX2emyJp3FRYN6qmcUbpwW',
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    }

    const service = new TaxApplicationService(wrapper.vm)
    expect(service.GetDailyBreadData(person)).toEqual(result)
  })
})

/* =============================================================
 *  テストデータ
 * ============================================================= */
// ---------------- 正常 ----------------
const inputCofogData = {
  amount: Price.create(10000),
  year: 2021,
  governmentName: 'つくば市',
  budgetName: 'つくば市YYYY年度予算',
  taxList: [
    {
      amount: Price.create(8000),
      cofog: new Cofog(
        CofogCode.create({
          level1: 1,
          level2: null,
          level3: null,
        }),
        'カテゴリ1',
        'XX2emyJp3FRYN6qmcUbpwW',
      ),
      children: [
        {
          amount: Price.create(2000),
          cofog: new Cofog(
            CofogCode.create({
              level1: 1,
              level2: 1,
              level3: null,
            }),
            'サブカテゴリ1-1',
            'XX2emyJp3FRYN6qmcUbpwW',
          ),
          children: [
            {
              amount: Price.create(1500),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 1,
                  level3: 1,
                }),
                'サブカテゴリ1-1-1',
                'XX2emyJp3FRYN6qmcUbpwW',
              ),
            },
            {
              amount: Price.create(500),
              cofog: new Cofog(
                CofogCode.create({
                  level1: 1,
                  level2: 1,
                  level3: 2,
                }),
                'サブカテゴリ1-1-2',
                'XX2emyJp3FRYN6qmcUbpwW',
              ),
            },
          ],
        },
      ],
    },
  ],
}
