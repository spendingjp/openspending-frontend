export type BudgetResponse = {
  id: string
  name: string
  slug: string
  year: string
  subtitle: string
  classificationSystem: string
  government: string
  sourceBudget?: string
  createdAt: string
  updatedAt: string
}

export type Budget = BudgetResponse

export type BudgetListResponse = {
  "budgets": BudgetResponse[]
  "defaultBudget": BudgetResponse
}

export type BudgetList = BudgetListResponse
