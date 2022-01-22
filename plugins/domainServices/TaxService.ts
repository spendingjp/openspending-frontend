import { NuxtAppOptions } from '@nuxt/types'
import { CofogCode } from '../valueObjects/CofogCode'
import { Goverment } from '../entities/Goverment'
import { Person } from '../entities/Person'
import { Price } from '../valueObjects/Price'
import { CofogData, TaxChild } from '../dataTransferObjects/cofogData'

/**
 * 税金サービス
 */
export class TaxService {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * 税額算出
   * @param param
   * @returns 税額
   */
  public calcTax(param: {
    person: Person
    goverment: Goverment
    cofogCode: CofogCode
  }): Price | null {
    const taxAmount = this.calcAmountTax({
      person: param.person,
      goverment: param.goverment,
    })
    const cofogData: CofogData = this.app.$repositories('cofogData').Get()
    const flatTaxList: TaxChild[] = cofogData.taxList
      .map((item) => {
        return [
          {
            amount: item.amount,
            cofog: item.cofog,
          },
          ...item.children,
        ]
      })
      .flat()

    let tax = null

    const targetCofog = flatTaxList.find(
      (item) => {
        return item.cofog.Code.StrCode === param.cofogCode.StrCode  // code同士の比較はできない
      }
    )?.amount
    if (targetCofog !== undefined) {
      const rate = targetCofog.value / cofogData.amount.value

      if (rate !== undefined) {
        tax = Price.create(taxAmount.value * rate / 365)
      }
    }

    return tax
  }

  /**
   * 世帯の合計住民税額を算出する
   * @param param
   * @returns 住民税額
   */
  public calcAmountTax(param: { person: Person; goverment: Goverment }): Price {
    return param.person.Salary.minus(
      param.goverment.getKojo({ homeType: param.person.HomeType })
    ).times(param.goverment.TaxRate)
  }
}
