import { getAccessorType } from 'typed-vuex'
import { ActionContext } from 'vuex/types'
import { Context } from '@nuxt/types'

// *** 要修正 ***
// データを追加
import * as regionCofogData from '~/store/regionCofogData'
import * as dailyBreadData from '~/store/dailyBreadData'

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
    action: ActionContext<RootState, RootState>,
    context: Context
  ) => {
    // nuxtServerInitの処理
    // SSG するため、ユーザーからのリクエスト時にわかる情報はここで使用できない
  },
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
    dailyBreadData,
  },
})
