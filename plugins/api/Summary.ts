/* eslint-disable camelcase */  // API仕様のため
export type Summary = {
  amount: number
  cache_key: string,
  cached: boolean,
  currency: { amount: string },
  num_drilldowns: number,
  num_entries: number,
  page: number,
  pages: number,
  pagesize: number
}
