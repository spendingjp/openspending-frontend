export class Summary {
  constructor(
    private numDrilldowns: number,
    private pagesize: number,
    private cached: boolean,
    private amount: number,
    private pages: number,
    private currencyAmount: string,
    private numEntries: number,
    private cacheKey: string,
    private page: number,
  ) {}

  getAmount() {
    return this.amount
  }

  getCacheKey() {
    return this.cacheKey
  }

  getCached() {
    return this.cached
  }

  getCurrencyAmount() {
    return this.currencyAmount
  }
  
  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
