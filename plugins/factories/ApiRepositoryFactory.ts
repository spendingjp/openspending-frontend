// import { SampleRepository } from '../repositories/SampleReposiotory'
import { CofogDataRepository } from '../repositories/CofogDataRepository'
import {
  CofogRepository
} from '~/plugins/repositories/CofogRepository'

export interface Repositories {
  cofog: typeof CofogRepository,
  cofogData: typeof CofogDataRepository
  // sample: typeof SampleRepository
}

export const repositories: Repositories = {
  cofog: CofogRepository,
  cofogData: CofogDataRepository
  // sample: SampleRepository
}

export const apiRepositoryFactory = {
  get: (key: keyof Repositories) => repositories[key]
}