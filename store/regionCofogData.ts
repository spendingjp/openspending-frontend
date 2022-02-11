import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { COFOGAPIService } from '~/plugins/applicationServices/COFOGAPIService'
import { CofogData } from '~/plugins/dataTransferObjects/cofogData'

export const state = () => ({
  regionCofogData: {} as CofogData
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  regionCofogData: state => state.regionCofogData
})

export const mutations = mutationTree(state, {
  setRegionCofogData(state, regionCofog: CofogData): void {
    state.regionCofogData = regionCofog;
  }
})

export const actions = actionTree({ state, getters, mutations }, {
  async setRegionCofogFromAPI({ commit }) {
    // リポジトリ（API）からデータを取得し、Vuexに登録
    const apiService = new COFOGAPIService(this.app)
    const res = await apiService.GetData()
    commit("setRegionCofogData", res)
  }
})