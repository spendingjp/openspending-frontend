/**
 * 使途子カテゴリ
 */
export type DailyBreadChild = Readonly<{
  amount: number,
  name: string,
  cofogCode: string,
}>

/**
 * 使途親カテゴリ
 */
export type DailyBreadItem = Readonly<{
  amount: number,
  name: string,
  cofogCode: string,
  children: DailyBreadChild[]
}>

/**
 * 一日の使途
 */
export type DailyBread = Readonly<{
  amount: number,
  taxList: DailyBreadItem[]
}>
