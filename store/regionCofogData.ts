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
    // const res: APIResponse = await this.app.$repositories('cofog').Get()  // オブジェクトが返るのを期待。単純にAPIレスポンスを変換した物
    // console.log('vuex action: ' + res)
    // const cofog = RegionCofog.CreateFromAPIResponse(res)
    // console.log(cofog)
    // APIレスポンスを使いやすい形に変換？
    // 各ページでの表示方法に依存するので、ここで変換するのはおかしいか？
    commit("setRegionCofogData", res)
  }
})