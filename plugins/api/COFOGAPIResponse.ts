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
}
