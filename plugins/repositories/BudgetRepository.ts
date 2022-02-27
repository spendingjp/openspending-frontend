import { NuxtAppOptions } from '@nuxt/types/app'
import { BudgetListResponse } from '../api/BudgetList'

/**
 * APIリポジトリ
 */
export class BudgetRepository {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * APIからデータを取得する
   * @returns オブジェクト変換結果
   */
  public async Get(): Promise<BudgetListResponse> {
    const slug = this.app.$accessor.regionCofogData.governmentSlug
    const uri = `/governments/${slug}/budgets` // nuxt.config.tsで設定したbaseUrlに続くURLを指定可能
    const apiResponse = await this.app.$axios.$get<BudgetListResponse>(uri)
    return apiResponse
  }

}
