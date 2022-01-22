import { Cofog } from '../valueObjects/CofogCode'

export class Drilldown {
  /**
   *
   * @param amount
   * @param cofog1
   * @param cofog2
   * @param cofog3
   * @param numEntries
   */
  constructor(
    private amount: number,
    private cofog1: Cofog,
    private cofog2: Cofog,
    private cofog3: Cofog,
    private numEntries: number
  ) { }

  getAmount() {
    return this.amount
  }

  getCofog1() {
    return this.cofog1
  }

  getCofog2() {
    return this.cofog2
  }

  getCofog3() {
    return this.cofog3
  }

  getNumEntries() {
    return this.numEntries
  }

  toJSON() {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
