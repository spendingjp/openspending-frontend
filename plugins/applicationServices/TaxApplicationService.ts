import { NuxtAppOptions } from '@nuxt/types'
import {
  CofogData,
  TaxItemLevel1,
  TaxItemLevel2,
  TaxItemLevel3,
} from '../dataTransferObjects/cofogData'
import {
  DailyBread,
  DailyBreadItem,
} from '../dataTransferObjects/dailyBreadData'
import { TaxService } from '../domainServices/TaxService'
import { Government } from '../entities/Goverment'
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
    const taxList: DailyBreadItem[] = cofogData.taxList.map((tax) =>
      this.ConvertTax2BreadItem(tax, taxService, person, government)
    )

    return {
      amount: taxService.calcAmountTax({
        person,
        government,
      }).value,
      taxList,
    }
  }

  private ConvertTax2BreadItem(
    item: TaxItemLevel1 | TaxItemLevel2 | TaxItemLevel3,
    service: TaxService,
    person: Person,
    government: Government
  ): DailyBreadItem {
    const amount = service.calcTax({
      person,
      government,
      cofogCode: item.cofog.Code,
    })

    return {
      amount: amount !== null ? amount.value : 0,
      name: item.cofog.Name,
      iconId: item.cofog.IconId,
      cofogCode: item.cofog.Code.StrCode,
      children:
        'children' in item
          ? item.children.map((child: TaxItemLevel2 | TaxItemLevel3) =>
              this.ConvertTax2BreadItem(child, service, person, government)
            )
          : null,
    }
  }
}
