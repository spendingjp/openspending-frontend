/**
 * 世帯種別
 */
export const HOME_TYPE = {
  /**
   * 単身世帯
   */
  SINGLE: 'SINGLE',
  /**
   * 扶養あり
   */
  FAMILY: 'FAMILY'
} as const

/**
 * 世帯種別
 */
export type HOME_TYPE = typeof HOME_TYPE[keyof typeof HOME_TYPE]