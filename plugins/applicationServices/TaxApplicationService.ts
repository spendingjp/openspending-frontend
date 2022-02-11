import { NuxtAppOptions } from '@nuxt/types'
import { CofogData } from '../dataTransferObjects/cofogData'
import {
  DailyBread,
  DailyBreadChild,
  DailyBreadItem,
} from '../dataTransferObjects/dailyBreadData'
import { TaxService } from '../domainServices/TaxService'
import { Person } from '../entities/Person'
import { GovernmentFactory } from '../factories/GovermentFactory'

/**
 * 税金アプリケーションサービス
 */
export class TaxApplicationService {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * 一日当たりの使途を返す
   * @param person 住民
   * @returns 一日当たりの使途
   */
  public GetDailyBreadData(person: Person): DailyBread {
    // COFOGデータを取得
    const cofogData: CofogData = this.app.$repositories('cofogData').Get()
    if (cofogData === undefined) {
      throw new Error('COFOGデータなし')
    }

    // 自治体を取得
    const govFactory = new GovernmentFactory(this.app)
    const government = govFactory.Get()

    const taxService = new TaxService(this.app)

    // 一日当たりの使途を生成
    const taxList: DailyBreadItem[] = cofogData.taxList.map((tax) => {
      const amount = taxService.calcTax({
        person,
        government,
        cofogCode: tax.cofog.Code,
      })

      const children: DailyBreadChild[] = tax.children?.map((childTax) => {
        const childAmount = taxService.calcTax({
          person,
          government,
          cofogCode: childTax.cofog.Code,
        })

        return {
          amount: childAmount !== null ? childAmount.value : 0,
          name: childTax.cofog.Name,
          cofogCode: childTax.cofog.Code.StrCode,
        }
      })

      return {
        amount: amount !== null ? amount.value : 0,
        name: tax.cofog.Name,
        cofogCode: tax.cofog.Code.StrCode,
        children: children !== undefined ? children : [],
      }
    })

    return {
      amount: taxService.calcAmountTax({
        person,
        government,
      }).value,
      taxList,
    }
  }
}
