import { Cofog } from "../valueObjects/Cofog"
import { Price } from "../valueObjects/Price"
import { Rate } from "../valueObjects/Rate"

/**
 * 税金
 */
export class Tax {
  /**
   * 金額
   */
  private amount: Price
  /**
   * 自治体の総税額に対する割合
   */
  private rate: Rate
  /**
   * COFOG
   */
  private cofog: Cofog

  private readonly id: string

  constructor(param: { amount: Price, rate: Rate, cofog: Cofog }) {
    this.amount = param.amount
    this.rate = param.rate
    this.cofog = param.cofog
    this.id = param.cofog.Code.StrCode
  }

  /**
   * 金額
   */
  get Amount() {
    return this.amount
  }

  /**
   * 自治体の総税額に対する割合
   */
  get Rate() {
    return this.rate
  }

  /**
   * COFOG
   */
  get Cofog() {
    return this.cofog
  }
}