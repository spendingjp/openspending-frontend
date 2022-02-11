import { HOME_TYPE } from '../valueObjects/HomeType'
import { Price } from '../valueObjects/Price'
import { TaxRate } from '../valueObjects/TaxRate'

/**
 * 自治体
 */
export class Government {
  /**
   * 世帯ごとの税率
   */
  private taxRate: TaxRate

  constructor(param: { taxRate: TaxRate }) {
    this.taxRate = param.taxRate
  }

  get TaxRate() {
    return this.taxRate
  }

  /**
   * 控除額取得
   * @param param {homeType: 世帯種別}
   * @returns 控除額
   */
  public getKojo(param: { homeType: HOME_TYPE }): Price {
    switch (param.homeType) {
      case HOME_TYPE.SINGLE:
        return Price.create(330000)

      case HOME_TYPE.FAMILY:
        return Price.create(660000)

      default:
        throw new Error('世帯種別が想定外:' + param.homeType)
    }
  }
}
