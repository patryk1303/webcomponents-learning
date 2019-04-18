import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";

const template = require('./DeparturesPage.html')

@registerElement('departures-page')
class DeparturesPage extends BaseElement {
  constructor() {
    super(template)

    this.classList.add('departures-page')
  }

  render() {
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