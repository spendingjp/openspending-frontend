import { PrimitiveValueObject } from './PrimitiveValueObject'

/**
 * 割合
 */
export class Rate extends PrimitiveValueObject<number> {
  static create(value: number): Rate {
    if (value < 0 || value > 1) {
      throw new Error('割合には0～1を指定してください')
    }
    return new Rate(value)
  }

  /**
   * 割合（100%を1としたときの値）
   */
  get rate(): number {
    return this._value
  }

  /**
   * 単位[%]に変換した割合
   * @returns パーセンテージ
   */
  public getPercentage(): number {
    return this._value * 100
  }
}
