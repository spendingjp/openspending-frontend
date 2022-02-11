import { NuxtAppOptions } from '@nuxt/types/app'
import { Cofog } from '../valueObjects/Cofog'
import { CofogCode } from '../valueObjects/CofogCode'
import { Price } from '../valueObjects/Price'
import {
  CofogData,
  TaxItemLevel3,
  TaxItemLevel1,
} from '../dataTransferObjects/cofogData'
import { COFOGAPIResponse } from '../api/COFOGAPIResponse'
import { Budget } from '../api/Budget'

/**
 * COFOG APIサービス
 */
export class COFOGAPIService {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * APIからCOFOGデータを取得する
   * @returns COFOGデータ
   */
  public async GetData(): Promise<CofogData> {
    try {
      const apiResponse: COFOGAPIResponse = await this.app
        .$repositories('cofog')
        .Get()

      const taxList: TaxItemLevel1[] = apiResponse.budgets.map((item) => ({
        ...this.ConvertBudget2TaxItem(item),
        children:
          item.children !== null
            ? item.children.map((level2item) => ({
                ...this.ConvertBudget2TaxItem(level2item),
                children:
                  level2item.children !== null
                    ? level2item.children.map((level2item) =>
                        this.ConvertBudget2TaxItem(level2item)
                      )
                    : [],
              }))
            : [],
      }))

      return {
        amount: Price.create(apiResponse.totalAmount),
        taxList,
        year: apiResponse.year,
        governmentName: apiResponse.government.name,
      }
    } catch (e) {
      throw new Error('APIレスポンスをオブジェクトに変換失敗')
    }
  }

  /**
   * 予算データを税金オブジェクトに変換する
   * @param budget APIレスポンスの予算データ
   * @returns 税金オブジェクト
   */
  private ConvertBudget2TaxItem(budget: Budget): TaxItemLevel3 {
    const cofogLevelNums = budget.code.split('.')
    return {
      amount: Price.create(budget.amount),
      cofog: new Cofog(
        CofogCode.create({
          level1: Number(cofogLevelNums[0]),
          level2: cofogLevelNums.length >= 2 ? Number(cofogLevelNums[1]) : null,
          level3: cofogLevelNums.length >= 3 ? Number(cofogLevelNums[2]) : null,
        }),
        budget.name
      ),
    }
  }
}
