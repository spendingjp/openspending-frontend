import { Repositories } from '~/plugins/factories/ApiRepositoryFactory'
import { accessorType } from '~/store'

/* -------------------------------------------------------
 * リポジトリ
 * ------------------------------------------------------- */
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $repositories: <K extends keyof Repositories>(key: K) => ReturnType<Repositories[K]>
    // readonly $repositories: repositories  // this.app.XXXでも、TS2349呼び出し不可となる
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    // $repositories: Repositories // This expression is not callable. Type 'Repositories' has no call signatures.Vetur(2349)
    readonly $repositories: <K extends keyof Repositories>(key: K) => ReturnType<Repositories[K]>

  }
}


declare module 'vuex' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    readonly $repositories: Repositories
  }
}

/* -------------------------------------------------------
 * Vuex
 * ------------------------------------------------------- */
declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}