/**
 * Registers custom web component
 * @param elementTagName Element tag name to register
 */
export default function registerElement (elementTagName: string) {
  return function(elementClass: Function) {
    customElements.define(elementTagName, elementClass)
  }
}