import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { COFOGAPIService } from '~/plugins/applicationServices/COFOGAPIService'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'
import { Budget, BudgetList } from '~/plugins/api/BudgetList'
import { BudgetListApiService } from '~/plugins/applicationServices/BudgetListApiService'
import { Price } from '~/plugins/valueObjects/Price'

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
    state.defaultBudget = budgetList.defaultBudget
  },
  setRegionCofogData(state, regionCofog: CofogData): void {
    state.regionCofogData = regionCofog
    const data: CofogData = {
      // @ts-ignore
      amount: Price.create(regionCofog.amount.price as number),
      budgetName: regionCofog.budgetName,
      year: regionCofog.year,
      governmentName: regionCofog.governmentName,
      taxList: regionCofog.taxList
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
      if (budgetList.defaultBudget) {
        const budgetSlug = budgetList.defaultBudget.slug
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
