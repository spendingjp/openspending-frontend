// import { SampleRepository } from '../repositories/SampleReposiotory'
import { CofogDataRepository } from '../repositories/CofogDataRepository'
import {
  CofogRepository
} from '~/plugins/repositories/CofogRepository'
import { BudgetRepository } from '../repositories/BudgetRepository'

export interface Repositories {
  cofog: typeof CofogRepository
  cofogData: typeof CofogDataRepository
  budget: typeof BudgetRepository
  // sample: typeof SampleRepository
}

export const repositories: Repositories = {
  cofog: CofogRepository,
  cofogData: CofogDataRepository,
  budget: BudgetRepository,
  // sample: SampleRepository
}

export const apiRepositoryFactory = {
  get: (key: keyof Repositories) => repositories[key]
}