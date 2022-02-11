import { getAccessorType } from 'typed-vuex'
import { ActionContext } from "vuex/types";
import { Context } from "@nuxt/types";


// *** 要修正 ***
// データを追加
import * as regionCofogData from '~/store/regionCofogData'

// ---------- ここは修正不要。そのまま残しておくこと！ ---------
export const state = () => {
  return {}
}

type RootState = ReturnType<typeof state>

export const getters = {
  //
}

export const mutations = {
  //
}

export const actions = {
  nuxtServerInit: async (
    context: ActionContext<RootState, RootState>,
    _: Context
  ) => {
    // nuxtServerInitの処理
    await context.dispatch('regionCofogData/setRegionCofogFromAPI')
  }
}
// ---------- ここまで ----------

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // *** 要修正 ***
    // データを追加したら、ここにも追加
    regionCofogData,
  },
})