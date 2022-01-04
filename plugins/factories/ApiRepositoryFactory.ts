// import { SampleRepository } from '../repositories/SampleReposiotory'
import {
  CofogRepository
} from '~/plugins/repositories/CofogRepository'

export interface Repositories {
  cofog: typeof CofogRepository,
  // sample: typeof SampleRepository
}

export const repositories:Repositories = {
  cofog: CofogRepository,
  // sample: SampleRepository
}

export const apiRepositoryFactory = {
  get: (key: keyof Repositories) => repositories[key]
}