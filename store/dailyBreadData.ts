import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { TaxApplicationService } from '~/plugins/applicationServices/TaxApplicationService'
import { DailyBreadItem } from '~/plugins/dataTransferObjects/dailyBreadData'
import { Person } from '~/plugins/entities/Person'
import { HOME_TYPE } from '~/plugins/valueObjects/HomeType'
import { Price } from '~/plugins/valueObjects/Price'

export const state = () => ({
  income: 4000000,
  yearlyTax: 0,
  homeType: 'SINGLE' as HOME_TYPE,
  taxList: [] as DailyBreadItem[],
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  income: (state) => state.income,
  yearlyTax: (state) => state.yearlyTax,
  houseType: (state) => state.homeType,
})

export const mutations = mutationTree(state, {
  setIncomeMutatation(state, income: number): void {
    state.income = income
  },
  setYearlyTaxMutation(state, yearlyTax: number): void {
    state.yearlyTax = yearlyTax
  },
  setHouseTypeMutation(state, houseType: HOME_TYPE): void {
    state.homeType = houseType
  },
  setTaxListMutation(state, taxList: DailyBreadItem[]): void {
    state.taxList = taxList
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    setIncome({ commit, state }, payload: number) {
      const appService = new TaxApplicationService(this.app)
      const person = new Person({
        salary: Price.create(payload),
        homeType: state.homeType,
      })
      const tax = appService.GetDailyBreadData(person)
      commit('setIncomeMutatation', payload)
      commit('setYearlyTaxMutation', tax.amount)
      commit('setTaxListMutation', tax.taxList)
    },
    setHouseType({ commit, state }, payload: string) {
      const appService = new TaxApplicationService(this.app)
      const homeType =
        payload === HOME_TYPE.SINGLE ? HOME_TYPE.SINGLE : HOME_TYPE.FAMILY
      const person = new Person({
        salary: Price.create(state.income),
        homeType,
      })
      const tax = appService.GetDailyBreadData(person)
      commit('setYearlyTaxMutation', tax.amount)
      commit('setHouseTypeMutation', homeType)
      commit('setTaxListMutation', tax.taxList)
    },
  }
)
