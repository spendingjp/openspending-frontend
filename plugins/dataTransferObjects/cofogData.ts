import { Cofog } from '../valueObjects/Cofog'
import { Price } from '../valueObjects/Price'

export type TaxItemLevel3 = Readonly<{
  amount: Price
  cofog: Cofog
}>

export type TaxItemLevel2 = Readonly<{
  amount: Price
  cofog: Cofog
  children: TaxItemLevel3[]
}>

export type TaxItemLevel1 = Readonly<{
  amount: Price
  cofog: Cofog
  children: TaxItemLevel2[]
}>

/**
 * COFOGデータ
 */
export type CofogData = Readonly<{
  /**
   * 総税額
   */
  amount: Price
  /**
   * COFOGデータ
   */
  taxList: TaxItemLevel1[]
  /**
   * 予算作成年度
   */
  year: number
  /**
   * 自治体名称
   */
  governmentName: string
  /**
   * 予算名称
   */
  budgetName: string
}>
