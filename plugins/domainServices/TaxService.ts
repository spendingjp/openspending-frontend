import { NuxtAppOptions } from '@nuxt/types'
import { CofogCode } from '../valueObjects/CofogCode'
import { Government } from '../entities/Goverment'
import { Person } from '../entities/Person'
import { Price } from '../valueObjects/Price'
import { CofogData, TaxItemLevel3 } from '../dataTransferObjects/cofogData'

/**
 * 税金サービス
 */
export class TaxService {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * 一日当たりの税額算出
   * @param param
   * @returns 税額（単位:円）
   */
  public calcTax(param: {
    person: Person
    government: Government
    cofogCode: CofogCode
  }): Price | null {
    const taxAmount = this.calcAmountTax({
      person: param.person,
      government: param.government,
    })
    const cofogData: CofogData = this.app.$repositories('cofogData').Get()
    const flatTaxList: TaxItemLevel3[] = cofogData.taxList
      .map((item) => {
        return [
          {
            amount: item.amount,
            cofog: item.cofog,
          },
          ...item.children
            .map((level2Item) => [
              {
                amount: level2Item.amount,
                cofog: level2Item.cofog,
              },
              ...level2Item.children
                .map((level3Item) => ({
                  amount: level3Item.amount,
                  cofog: level3Item.cofog,
                }))
                .flat(),
            ])
            .flat(),
        ]
      })
      .flat()

    let tax = null

    const targetCofog = flatTaxList.find((item) => {
      return item.cofog.Code.StrCode === param.cofogCode.StrCode // code同士の比較はできない
    })?.amount
    if (targetCofog !== undefined) {
      const rate = targetCofog.value / cofogData.amount.value

      if (rate !== undefined) {
        tax = Price.create((taxAmount.value * rate) / 365)
      }
    }

    return tax
  }

  /**
   * 世帯の合計住民税額を算出する
   * @param param
   * @returns 住民税額
   */
  public calcAmountTax(param: {
    person: Person
    government: Government
  }): Price {
    return param.person.Salary.minus(
      param.government.getKojo({ homeType: param.person.HomeType })
    ).times(param.government.TaxRate)
  }
}
