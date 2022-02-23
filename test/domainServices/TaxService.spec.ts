import { createLocalVue, mount } from '@vue/test-utils'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { TaxService } from '~/plugins/domainServices/TaxService'
import { Person } from '~/plugins/entities/Person'
import { GovernmentFactory } from '~/plugins/factories/GovermentFactory'
import { Cofog } from '~/plugins/valueObjects/Cofog'
import { CofogCode } from '~/plugins/valueObjects/CofogCode'
import { HOME_TYPE } from '~/plugins/valueObjects/HomeType'
import { Price } from '~/plugins/valueObjects/Price'

const localVue = createLocalVue()

// ダミーVueコンポーネント（リポジトリのコンストラクタに$axiosを渡すために作成）
const TestComponent = {
  template: '<div />',
}

describe('TaxService', () => {
  it('正常', () => {
    // リポジトリをモック
    const wrapper = mount(TestComponent, {
      localVue,
      mocks: {
        $repositories: (_: string) => ({
          Get: (): CofogData => ({
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
                  'カテゴリ1'
                ),
                children: [
                  {
                    amount: Price.create(2000),
                    cofog: new Cofog(
                      CofogCode.create({
                        level1: 1,
                        level2: 2,
                        level3: null,
                      }),
                      'サブカテゴリ1-1'
                    ),
                    children: [
                      {
                        amount: Price.create(2000),
                        cofog: new Cofog(
                          CofogCode.create({
                            level1: 1,
                            level2: 2,
                            level3: 3,
                          }),
                          'サブカテゴリ1-1-1'
                        ),
                      },
                    ],
                  },
                ],
              },
            ],
          }),
        }),
      },
    })

    const person = new Person({
      salary: Price.create(10000000),
      homeType: HOME_TYPE.SINGLE,
    })

    const govFactory = new GovernmentFactory(wrapper.vm)
    const goverment = govFactory.Get()

    const service = new TaxService(wrapper.vm)
    expect(
      service.calcTax({
        person,
        government: goverment,
        cofogCode: CofogCode.create({
          level1: 1,
          level2: 2,
          level3: 3,
        }),
      })
    ).toEqual(Price.create(((10000000 - 330000) * 0.06 * 2000) / 10000 / 365))
  })
})
