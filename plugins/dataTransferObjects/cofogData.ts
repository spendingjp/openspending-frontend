import { Cofog } from "../valueObjects/Cofog";
import { Price } from "../valueObjects/Price";

export type TaxChild = Readonly<{
  amount: Price,
  cofog: Cofog,
}>

export type TaxItem = Readonly<{
  amount: Price,
  cofog: Cofog
  children: TaxChild[]
}>

export type CofogData = Readonly<{
  amount: Price,
  taxList: TaxItem[]
}>
