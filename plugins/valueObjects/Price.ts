import { TaxRate } from './TaxRate'
import { PrimitiveValueObject } from './PrimitiveValueObject'

/**
 * 金額
 */
export class Price extends PrimitiveValueObject<number> {
  static create(value: number): Price {
    if (value < 0) {
      throw new Error('金額には0円以上を指定してください')
    }
    return new Price(value)
  }

  get price(): number {
    return this._value
  }

  /**
   * 足し算
   * @param value 金額
   * @returns 結果
   */
  public add(value: Price) {
    return Price.create(this.price + value.price)
  }

  /**
   * かけ算
   * @param value 税率
   * @returns 結果
   */
  public times(value: TaxRate) {
    return Price.create(this.price * value.rate)
  }

  /**
   * 引き算
   * @param value 金額
   * @returns 結果
   */
  public minus(value: Price) {
    return Price.create(this.price - value.price)
  }

  public divide(value: Price) {
    return Price.create(this.price / value.price)
  }

  toJSON() {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
