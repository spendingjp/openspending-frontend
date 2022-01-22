/* eslint-disable camelcase */ // API仕様のため
import {Cofog} from './Cofog'


export type Drilldown = {
  /**
   * 税額
   */
  amount: number;
  /**
   * COFOG第1レベル
   */
  cofog1: Cofog;
  /**
   * COFOG第2レベル
   */
  cofog2: Cofog;
  /**
   * COFOG第3レベル
   */
  cofog3: Cofog;
  num_entries: number;

  // constructor(amount: number, cofog1: Cofog, cofog2: Cofog, cofog3: Cofog, numEntries: number) {
  //   this.amount = amount;
  //   this.cofog1 = cofog1;
  //   this.cofog2 = cofog2;
  //   this.cofog3 = cofog3;
  //   this.numEntries = numEntries;
  // }
}