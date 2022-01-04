export class Cofog {
  constructor(
    private taxonomy: string,
    private htmlUrl: string,
    private id: number,
    private name: string,
    private label: string
  ) { }

  getHtmlUrl() {
    return this.htmlUrl
  }

  getLabel() {
    return this.label
  }

  getName() {
    return this.name
  }

  getTaxonomy() {
    return this.taxonomy
  }

  getId() {
    return this.id
  }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}