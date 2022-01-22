import { NuxtAppOptions } from '@nuxt/types/app'
import { Cofog } from '../valueObjects/Cofog'
import { CofogCode } from '../valueObjects/CofogCode'
import { Price } from '../valueObjects/Price'
import { CofogData, TaxChild, TaxItem } from '../dataTransferObjects/cofogData'
import { APIResponse } from '../api/APIResponse'

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
      const apiResponse: APIResponse = await this.app
        .$repositories('cofog')
        .Get()

      const level1Nums: number[] = []

      const tempTaxList: TaxChild[] = apiResponse.drilldown.map((item) => {
        if (!level1Nums.find(level => level === item.cofog1._id)) {
          level1Nums.push(item.cofog1._id)
        }

        return {
          amount: Price.create(item.amount),
          cofog: new Cofog(
            CofogCode.create({
              level1: item.cofog1._id,
              level2: item.cofog2._id,
              level3: item.cofog3._id,
            }),
            item.cofog2.label
          ),
        }
      })

      const taxList: TaxItem[] = level1Nums.map(level => {
        const sameLevelItems = tempTaxList.filter(item => item.cofog.Code.Level1 === level)
        const amount = sameLevelItems.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.amount.value
        }, 0)
        let cofogLevel1Name = apiResponse.drilldown.find(item => item.cofog1._id === level)?.cofog1.label
        if (cofogLevel1Name === undefined) {
          cofogLevel1Name = ''
        }

        return {
          cofog: new Cofog(
            CofogCode.create({
              level1: level,
              level2: null,
              level3: null
            }), cofogLevel1Name),
          children: sameLevelItems,
          amount: Price.create(amount)
        }
      })

      return {
        amount: Price.create(apiResponse.summary.amount),
        taxList,
      }
    } catch (e) {
      console.error(e)
      throw new Error('error')
    }
  }
}
