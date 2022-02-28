import { NuxtAppOptions } from '@nuxt/types/app'
import { BudgetList, BudgetListResponse } from '../api/BudgetList'


export class BudgetListApiService {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * APIからBudgetListデータを取得する
   * @returns BudgetListデータ
   */
  public async GetData(): Promise<BudgetList> {
    try {
      const repo = this.app.$repositories('budget')
      const budgetListResponse: BudgetListResponse = await repo.Get()

      return budgetListResponse
    } catch (e) {
      console.log(e)
      throw new Error('APIレスポンスをオブジェクトに変換失敗')
    }
  }
}