import Handlebars from 'handlebars'

/**
 * Base class for project's Web Components
 */
export class BaseElement extends HTMLElement {
  protected compiledTemplate: Function

  constructor(template: string) {
    super()

    this.compiledTemplate = Handlebars.compile(template)
  }

  render() {
    this.innerHTML = this.compiledTemplate()
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {

  }

  adoptedCallback() {

  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    this.render();
  }

  static get observedAttributes() : string[] {
    return [];
  }
}