import { PrimitiveValueObject } from './PrimitiveValueObject'

/**
 * 税率
 */
export class TaxRate extends PrimitiveValueObject<number> {
  static create(value: number): TaxRate {
    if (value < 0 || value > 1) {
      throw new Error('税率には0～1を指定してください')
    }
    return new TaxRate(value)
  }

  get rate(): number {
    return this._value
  }
}
