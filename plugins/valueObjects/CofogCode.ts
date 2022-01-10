import { ValueObject } from './ValueObject'

interface CofogCodeProps {
  level1: number
  level2: number | null
  level3: number | null
}

/**
 * Cofog Code
 */
export class CofogCode extends ValueObject<CofogCodeProps> {
  static create(props: CofogCodeProps): CofogCode {
    if (props.level1 < 0) {
      throw new Error('Cofog Codeの第1レベルに負の値は設定できません')
    }
    if (props.level2 !== null && props.level2 < 0) {
      throw new Error('Cofog Codeの第2レベルに負の値は設定できません')
    }
    if (props.level3 !== null && props.level3 < 0) {
      throw new Error('Cofog Codeの第3レベルに負の値は設定できません')
    }
    return new CofogCode(props)
  }

  /**
   * ドット(.)で連結したコード
   */
  get StrCode() {
    return `${this._value.level1}.${this._value.level2 !== null ? this._value.level2 : 0}.${this._value.level3 !== null ? this._value.level3 : 0}`
  }

  get Level1() {
    return this._value.level1
  }

  get Level2() {
    return this._value.level2
  }

  get Level3() {
    return this._value.level3
  }

  toJSON() {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}