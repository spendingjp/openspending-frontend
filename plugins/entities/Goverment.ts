import { CofogCode } from "../valueObjects/CofogCode"
import { HOME_TYPE } from "../valueObjects/HomeType"
import { Price } from "../valueObjects/Price"
import { Rate } from "../valueObjects/Rate"
import { TaxRate } from "../valueObjects/TaxRate"
import { Tax } from "./Tax"

/**
 * 自治体
 */
export class Goverment {
  /**
   * 世帯ごとの税率
   */
  private taxRate: TaxRate

  // private amount: Price

  constructor(param: { taxRate: TaxRate }) {
    this.taxRate = param.taxRate
  }

  get TaxRate() {
    return this.taxRate;
  }

  // get Amount() {
  //   return this.amount
  // }

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

  // /**
  //  * 個別種別の税額を取得
  //  * @param param 種別
  //  * @returns 金額
  //  */
  // public getTax(param: { id: CofogCode }): Price | null {
  //   const taxType = this.taxList.find(x => x.Cofog.Code === param.id)
  //   if (taxType !== undefined) {
  //     return taxType.Amount
  //   } else {
  //     return null
  //   }
  // }

  // /**
  //  * 自治体の総税額に占める個別種別の割合を返す
  //  * @param param 種別
  //  * @returns 総税額に占める割合
  //  */
  // public getTaxRate(param: { cofogId: CofogCode }): Rate | null {
  //   const taxType = this.taxList.find(x => x.Cofog.Code === param.cofogId)
  //   if (taxType !== undefined) {
  //     return taxType.Rate
  //   } else {
  //     return null
  //   }
  // }

  // /**
  //  * 税金種別を取得
  //  * @param id 税金種別ID
  //  * @returns 税金種別
  //  */
  // public getTaxType(id: CofogCode): Tax | null {
  //   const taxType = this.taxList.find(x => x.Cofog.Code === id)
  //   if (taxType !== undefined) {
  //     return taxType
  //   } else {
  //     return null
  //   }
  // }
}