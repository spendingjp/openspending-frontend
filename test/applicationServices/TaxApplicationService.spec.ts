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
          Get: (): CofogData => ({
            amount: Price.create(10000),
            year: 2021,
            governmentName: 'つくば市',
            taxList: [
              {
                amount: Price.create(8000),
                cofog: new Cofog(
                  CofogCode.create({
                    level1: 1,
                    level2: 2,
                    level3: 3,
                  }),
                  'カテゴリ1'
                ),
                children: [
                  {
                    amount: Price.create(2000),
                    cofog: new Cofog(
                      CofogCode.create({
                        level1: 1,
                        level2: 1,
                        level3: 2,
                      }),
                      'サブカテゴリ1-1'
                    ),
                    children: [],
                  },
                ],
              },
            ],
          }),
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
          cofogCode: '1.2.3',
          children: [
            {
              amount: ((3000000 - 330000) * 0.06 * 2000) / 10000 / 365,
              cofogCode: '1.1.2',
              name: 'サブカテゴリ1-1',
            },
          ],
        },
      ],
    }

    const service = new TaxApplicationService(wrapper.vm)
    expect(service.GetDailyBreadData(person)).toEqual(result)
  })
})