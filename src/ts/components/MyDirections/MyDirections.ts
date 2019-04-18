import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";
import MyDirectionRow from "../../interfaces/MyDirectionRow";

const template = require('./MyDirections.html')

@registerElement('my-directions')
class MyDirections extends BaseElement {
  directions: MyDirectionRow[];

  constructor() {
    super(template)

    this.classList.add('my-directions')
  }

  render() {
    this.innerHTML = this.compiledTemplate({
      directions: this.directions
    })
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    if (attrName === 'directions') {
      this.directions = JSON.parse(newVal)
      this.render()
    }
  }

  static get observedAttributes() {
    return [
      'directions'
    ]
  }
}