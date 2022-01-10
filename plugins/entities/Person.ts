import { HOME_TYPE } from "../valueObjects/HomeType"
import { Price } from "../valueObjects/Price"

export class Person {
  private salary: Price
  private homeType: HOME_TYPE

  constructor(param: { salary: Price, homeType: HOME_TYPE }) {
    this.salary = param.salary
    this.homeType = param.homeType
  }

  /**
   * 世帯種別 取得
   * @returns 世帯種別
   */
  get HomeType() {
    return this.homeType
  }

  /**
   * 年収取得
   * @returns 年収
   */
  get Salary() {
    return this.salary
  }
}