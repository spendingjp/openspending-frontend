import { Inject, NuxtApp } from '@nuxt/types/app'
import { apiRepositoryFactory, Repositories } from '~/plugins/factories/ApiRepositoryFactory'

export default (app: NuxtApp, inject: Inject) => {
  const repositories = (name: keyof Repositories) => {
    switch (name) {
      case 'cofog':
        return new (apiRepositoryFactory.get('cofog'))(app)

      case 'cofogData':
        return new (apiRepositoryFactory.get('cofogData'))(app)

      // case 'sample':
      //   return new SampleRepository()

      default:
        throw new Error('リポジトリ名が不正:' + name)
    }
  }

  inject('repositories', repositories)
}