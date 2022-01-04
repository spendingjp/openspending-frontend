import { APIResponse } from "../api/APIResponse"
import { Cofog } from "./Cofog"
import { Drilldown } from "./Drilldown"
import { Summary } from "./Summary"

export class RegionCofog {
  constructor(private drilldown: Drilldown[], private summary: Summary)
  {
  }

  public getSummary() {
    return this.summary
  }

  public GetDrilldown() {
    return this.drilldown.slice()
  }

  static CreateFromAPIResponse(response: APIResponse): RegionCofog {
    return new RegionCofog(
      response.drilldown.map(item => {
        return new Drilldown(
          item.amount,
          new Cofog(
            item.cofog1.taxonomy,
            item.cofog1.html_url,
            item.cofog1._id,
            item.cofog1.name,
            item.cofog1.label,
          ),
          new Cofog(
            item.cofog2.taxonomy,
            item.cofog2.html_url,
            item.cofog2._id,
            item.cofog2.name,
            item.cofog2.label,
          ),
          new Cofog(
            item.cofog3.taxonomy,
            item.cofog3.html_url,
            item.cofog3._id,
            item.cofog3.name,
            item.cofog3.label,
          ),
          item.num_entries
        )
      }),
      new Summary(
        response.summary.num_drilldowns,
        response.summary.pagesize,
        response.summary.cached,
        response.summary.amount,
        response.summary.pages,
        response.summary.currency.amount,
        response.summary.num_entries,
        response.summary.cache_key,
        response.summary.page,
      )
    )
  }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}