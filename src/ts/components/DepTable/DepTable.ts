import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";

const template = require('./DepTable.html')

@registerElement('dep-table')
class DepTable extends BaseElement {
  constructor() {
    super(template)
  }

  render() {
    console.trace('dep table')
    this.innerHTML = this.compiledTemplate({
      stopId: this.stopId
    })
  }

  get stopId() {
    return this.dataset.stopId
  }

  static get observedAttributes() {
    return ['data-stop-id']
  }
}