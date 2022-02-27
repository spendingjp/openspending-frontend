import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { COFOGAPIService } from '~/plugins/applicationServices/COFOGAPIService'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { Budget, BudgetList } from '~/plugins/api/BudgetList'
import { BudgetListApiService } from '~/plugins/applicationServices/BudgetListApiService'
import { Price } from '~/plugins/valueObjects/Price'
import { Cofog } from '~/plugins/valueObjects/Cofog'
import { CofogCode } from '~/plugins/valueObjects/CofogCode'

export const state = () => ({
  regionCofogData: {} as CofogData,
  hostname: "" as string,
  budgets: [] as Budget[],
  defaultBudget: null as Budget | null,
  governmentSlug: "" as string,
  parsedCofogData: {} as CofogData
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  regionCofogData: (state) => state.regionCofogData,
  hostname: (state) => state.hostname,
  governmentSlug: (state) => state.governmentSlug,
  budgets: (state) => state.budgets,
  defaultBudget: (state) => state.defaultBudget,
  parsedCofogData: (state) => state.parsedCofogData
})

export const mutations = mutationTree(state, {
  setHostname(state, hostname: string): void {
    state.hostname = hostname
    const DEFAULT_SLUG = 'tsukuba-shi'
    // localhost:[port] の場合
    if (/^localhost[:0-9]*$/.test(hostname)) {
      state.governmentSlug = DEFAULT_SLUG
      return
    }
    // [ip]:[port] の場合
    if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/.test(hostname)) {
      state.governmentSlug = DEFAULT_SLUG
      return
    }

    const matched = hostname.match(/^(.+)\.openspending.net$/)
    if (matched && matched?.length > 1) {
      state.governmentSlug = matched[1]
      return
    } else {
      throw new SyntaxError("Unexpected hostname. Couldn't extract government slug.")
    }
  },
  setBudgetList(state, budgetList: BudgetList): void {
    state.budgets = budgetList.budgets
    state.defaultBudget = budgetList.defaultBudgets
  },
  setRegionCofogData(state, regionCofog: CofogData): void {
    console.log(regionCofog)
    state.regionCofogData = regionCofog
    const data: CofogData = {
      // @ts-ignore
      amount: Price.create(regionCofog.amount._value as number),
      budgetName: regionCofog.budgetName,
      year: regionCofog.year,
      governmentName: regionCofog.governmentName,
      taxList: regionCofog.taxList.map((item: any) => {
        return {
          amount: Price.create(item.amount._value),
          cofog: new Cofog(
            CofogCode.create({
              level1: item.cofog.code._value.level1,
              level2: item.cofog.code._value.level2,
              level3: item.cofog.code._value.level3,
            }),
            item.cofog.name
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
                child.cofog.name
              ),
              children: child.children.map((level3Item: any) => ({
                amount: Price.create(level3Item.amount._value),
                cofog: new Cofog(
                  CofogCode.create({
                    level1: level3Item.cofog.code._value.level1,
                    level2: level3Item.cofog.code._value.level2,
                    level3: level3Item.cofog.code._value.level3,
                  }),
                  level3Item.cofog.name
                ),
              })),
            }
          }),
        }
      }),
    }

    state.parsedCofogData = data
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    setHostname({ commit }, payload: string) {
      commit('setHostname', payload)
    },
    async fetchBudgetListAndWdmmgData({ commit }) {
      const budgetApiService = new BudgetListApiService(this.app)
      const budgetList = await budgetApiService.GetData()
      commit('setBudgetList', budgetList)

      const apiService = new COFOGAPIService(this.app)
      if (budgetList.defaultBudgets) {
        const budgetSlug = budgetList.defaultBudgets.slug
        const wdmmgRes = await apiService.GetData(budgetSlug)
        commit('setRegionCofogData', wdmmgRes)
      } else if (budgetList.budgets.length > 0) {
        // defaultBudget が設定されていない場合は budgets の先頭を表示する
        const budgetSlug = budgetList.budgets[0].slug
        const wdmmgRes = await apiService.GetData(budgetSlug)
        commit('setRegionCofogData', wdmmgRes)
      } else {
        throw new ReferenceError("A budget to show was not found.")
      }
    }
  }
)
