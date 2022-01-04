import {Drilldown} from './Drilldown'
import {Summary} from './Summary'

export interface APIResponse {
  drilldown: Drilldown[]
  summary: Summary

  // constructor(drilldown: Array<Drilldown>, summary: Summary) {
  //   this.drilldown = drilldown;
  //   this.summary = summary;
  // }

  // public GetDrilldown() {
  //   return this.drilldown.slice()
  // }

  // public GetSummary() {
  //   return this.summary;
  // }
}