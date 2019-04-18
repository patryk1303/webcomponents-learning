import template7 from 'template7'

const template = require('./testComponent.html')

import { registerElement } from "../../decorators";
import { BaseElement } from "../BaseElement";

@registerElement('test-element')
class TestComponent extends BaseElement {
  constructor() {
    super(template)
  }

  render() {
    this.innerHTML = this.compiledTemplate({
      name: this.name
    })
  }

  get name() {
    return this.dataset.name
  }

  static get observedAttributes() {
    return ['data-name'];
  }
}