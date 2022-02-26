import { CofogCode } from "./CofogCode";

/**
 * COFOG分類
 */
export class Cofog {
  /**
   * COFOGコード
   */
  private code: CofogCode
  /**
   * COFOG 名称
   */
  private name: string
  /**
   * COFOG アイコン
   */
  private iconId: string

  constructor(code: CofogCode, name: string, iconId: string) {
    if (name.length === 0 || name === null) {
      throw new Error("名称は必須です");
    }
    this.code = code
    this.name = name
    this.iconId = iconId
  }

  /**
   * COFOG コード
   */
  get Code() {
    return this.code
  }

  /**
   * COFOG 名称
   */
  get Name() {
    return this.name
  }

  /**
   * COFOG アイコン
   */
  get IconId() {
    return this.iconId
  }

  toJSON() {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
