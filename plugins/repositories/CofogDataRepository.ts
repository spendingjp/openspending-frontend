import { NuxtAppOptions } from '@nuxt/types/app'
import { CofogData } from '../dataTransferObjects/cofogData'
import { Cofog } from '../valueObjects/Cofog'
import { CofogCode } from '../valueObjects/CofogCode'
import { Price } from '../valueObjects/Price'

export class CofogDataRepository {
  private app: NuxtAppOptions

  constructor(app: NuxtAppOptions) {
    this.app = app
  }

  /**
   * 保存されたCOFOGデータを取得する
   * @returns COFOGデータ
   */
  public Get(): CofogData {
    const storeData = this.app.store?.getters['regionCofogData/regionCofogData']
    const data: CofogData = {
      amount: Price.create(storeData.amount._value),
      budgetName: storeData.budgetName,
      year: storeData.year,
      governmentName: storeData.governmentName,
      taxList: storeData.taxList.map((item: any) => {
        return {
          amount: Price.create(item.amount._value),
          cofog: new Cofog(
            CofogCode.create({
              level1: item.cofog.code._value.level1,
              level2: item.cofog.code._value.level2,
              level3: item.cofog.code._value.level3,
            }),
            item.cofog.name,
            item.cofog.iconId,
          ),
          children: item.children.map((child: any) => {
            return {
              amount: Price.create(child.amount._value),
              cofog: new Cofog(
                CofogCode.create({
                  level1: child.cofog.code._value.level1,
                  level2: child.cofog.code._value.level2,
                  level3: child.cofog.code._value.level3,
                }),
                child.cofog.name,
                child.cofog.iconId,
              ),
              children: child.children.map((level3Item: any) => ({
                amount: Price.create(level3Item.amount._value),
                cofog: new Cofog(
                  CofogCode.create({
                    level1: level3Item.cofog.code._value.level1,
                    level2: level3Item.cofog.code._value.level2,
                    level3: level3Item.cofog.code._value.level3,
                  }),
                  level3Item.cofog.name,
                  level3Item.cofog.iconId,
                ),
              })),
            }
          }),
        }
      }),
    }
    return data
  }
}
