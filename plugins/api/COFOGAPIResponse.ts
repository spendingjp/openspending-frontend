import { Budget } from './Budget'

/**
 * APIレスポンス
 */
export interface COFOGAPIResponse {
  id: string
  name: string
  subtitle: string
  slug: string
  /**
   * 予算作成年度
   */
  year: number
  createdAt: string
  updatedAt: string
  /**
   * 自治体
   */
  government: {
    id: string
    /**
     * 自治体名
     */
    name: string
    slug: string
    latitude: number
    longitude: number
    primaryColorCode: string | null
    secondaryColorCode: string | null
    createdAt: string
    updatedAt: string
  }
  /**
   * 総税額
   */
  totalAmount: number
  /**
   * 予算
   */
  budgets: Budget[]
  sourceBudget: {
    id: string
    /**
     * 予算名
     */
    name: string
    slug: string
    /**
     * 予算作成年度
     */
    year: number
    subtitle: string
    classificationSystem: string
    government: string
    createdAt: string
    updatedAt: string
  }
}
