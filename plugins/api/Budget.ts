/**
 * 予算（APIレスポンス）
 */
export type Budget = {
  /**
   * ID
   */
  id: string;
  /**
   * 項目名称
   */
  name: string;
  /**
   * COFOGコード（一部分のみ）
   */
  code: string;
  /**
   * アイコン
   */
  iconId: string;
  /**
   * 税額
   */
  amount: number;
  /**
   * 子要素
   */
  children: Budget[] | null
}
