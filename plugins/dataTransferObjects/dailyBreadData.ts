/**
 * 使途子カテゴリ
 */
export type DailyBreadChild = Readonly<{
  amount: number
  name: string
  cofogCode: string
}>

/**
 * 使途親カテゴリ
 */
export type DailyBreadItem = Readonly<{
  /**
   * 税額
   */
  amount: number
  /**
   * 税金名称
   */
  name: string
  /**
   * アイコン
   */
  iconId: string
  /**
   * COFOGコード
   */
  cofogCode: string
  /**
   * 子要素
   */
  children: DailyBreadItem[] | null
}>

/**
 * 一日の使途
 */
export type DailyBread = Readonly<{
  amount: number
  taxList: DailyBreadItem[]
}>
