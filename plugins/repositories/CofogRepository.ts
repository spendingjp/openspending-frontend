import { NuxtAppOptions } from '@nuxt/types/app'
import { COFOGAPIResponse } from '../api/COFOGAPIResponse'

/**
 * APIリポジトリ
 */
export class CofogRepository {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * APIからデータを取得する
   * @returns オブジェクト変換結果
   */
  public async Get(): Promise<COFOGAPIResponse> {
    const uri = '/tsukuba-shi-cofog2021/' // nuxt.config.tsで設定したbaseUrlに続くURLを指定可能
    const apiResponse = await this.app.$axios.$get<COFOGAPIResponse>(uri)
    if (this.isValidAPIResponse(apiResponse)) {
      return apiResponse
    } else {
      throw new Error('APIレスポンスが異常')
    }
  }

  /**
   * APIレスポンスが想定通りかを判断する
   * @param json APIレスポンス
   * @returns 想定通りならtrue, 異常ならfalse
   */
  private isValidAPIResponse(json: any): json is COFOGAPIResponse {
    // キーが存在するか
    if (
      json.year === undefined ||
      json.government === undefined ||
      json.budgets === undefined ||
      json.sourceBudget === undefined ||
      json.government.name === undefined ||
      json.sourceBudget.name === undefined
    ) {
      return false
    }

    const budgets = json.budgets
    if (Array.isArray(budgets)) {
      let isInvalidBudgets = budgets.some((item) => {
        if (
          item.id === undefined ||
          item.name === undefined ||
          item.code === undefined ||
          item.children === undefined
        ) {
          // budgetsの要素に想定通りでないものがある
          return true
        }
        return this.isValidBudget(item.children)
      })

      if (budgets.length === 0) {
        // 要素数0の場合各要素のチェックスはスキップされるが、異常としてマーク
        isInvalidBudgets = true
      }

      if (isInvalidBudgets) {
        // budgetsの各要素が想定通りでない
        return false
      }
    } else {
      // budgetsが配列でない
      return false
    }

    return true
  }

  /**
   * budgetsの各要素が想定通りかを判断する
   * @param json budgets/children要素
   * @returns 想定通りならtrue, 異常ならfalse
   */
  private isValidBudget(json: any): boolean {
    if (
      json.id === undefined ||
      json.name === undefined ||
      json.code === undefined ||
      json.amount === undefined ||
      json.children === undefined
    ) {
      return false
    }
    if (Array.isArray(json.children)) {
      return this.isValidBudget(json.children)
    }
    return true
  }
}
