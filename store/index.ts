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
    try {
      action.dispatch('regionCofogData/setHostname', context.req.headers.host)
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.error('Error on nuxtServerInit: ', err)
        context.error({ statusCode: 404, message: "Unexpected hostname." })
        return
      }
    }

    try {
      await action.dispatch('regionCofogData/fetchBudgetListAndWdmmgData')
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.error('Error on nuxtServerInit: ', err)
        context.error({ statusCode: 404, message: "A budget to show was not found." })
      }
    }
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
