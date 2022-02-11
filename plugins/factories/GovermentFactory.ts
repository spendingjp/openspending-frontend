import { NuxtAppOptions } from '@nuxt/types/app'
import { CofogData } from '../dataTransferObjects/cofogData'
import { Government } from '../entities/Goverment'
import { Tax } from '../entities/Tax'
import { Rate } from '../valueObjects/Rate'
import { TaxRate } from '../valueObjects/TaxRate'

export class GovernmentFactory {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  public Get(): Government {
    // const cofogData: CofogData = this.app.store?.getters.regionCofogData
    // if (cofogData === undefined) {
    //   throw new Error('store にCOFOGデータ無し')
    // }

    // const taxes: Tax[] = cofogData.taxList.map(tax => (new Tax({
    //   amount: tax.amount,
    //   rate: Rate.create(cofogData.amount.divide(tax.amount).value),
    //   cofog: tax.cofog
    // })))

    return new Government({
      taxRate: TaxRate.create(0.06),
    })
  }
}
