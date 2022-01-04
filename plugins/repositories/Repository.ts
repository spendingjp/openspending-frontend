import { Inject, NuxtApp } from '@nuxt/types/app'
import { SampleRepository } from './SampleReposiotory'
import {apiRepositoryFactory, Repositories} from '~/plugins/factories/ApiRepositoryFactory'
import { $axios } from '~/plugins/Axios'
// import { CofogRepository } from './CofogRepository'

// export default ({app}:{app: NuxtApp}, inject: Inject) => {
//   // const cofog = new CofogRepository(app.$axios)
//   // const repositories = {
//   //   cofog
//   // }
//   const repositories = (name: keyof Repositories) => {
//     return new (apiRepositoryFactory.get(name))(app.$axios)
//   }

//   inject('repositories', repositories)  // this.app.$repositories.hogeRepository.foo()で呼び出し可能
// }

export default (_: NuxtApp, inject: Inject) => {
  const repositories = (name: keyof Repositories) => {
    switch (name) {
      case 'cofog':
        return new (apiRepositoryFactory.get(name))($axios)
        
      // case 'sample':
      //   return new SampleRepository()
    
      default:
        throw new Error('リポジトリ名が不正:' + name)
    }
  }

  inject('repositories', repositories)
}