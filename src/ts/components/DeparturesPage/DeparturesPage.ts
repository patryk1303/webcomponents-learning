import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";
import MyDirectionRow from "../../interfaces/MyDirectionRow";

const template = require('./DeparturesPage.html')

@registerElement('departures-page')
class DeparturesPage extends BaseElement {
  directions: MyDirectionRow[];

  constructor() {
    super(template)

    this.directions = [
      {
        name: 'Dworzec PKP, PKS',
        lines: [3, 4, 6]
      },
      {
        name: 'CH Atrium',
        lines: [4]
      },
      {
        name: 'Cmentarz',
        lines: [4]
      },
      {
        name: 'Politechnika (Śniadeckich)',
        lines: [4, 18]
      },
      {
        name: 'Niekłonice Działki',
        lines: [3]
      },
      {
        name: 'Hala Widowiskowo-Sportowa',
        lines: [18]
      }
    ]

    this.classList.add('departures-page')
  }

  render() {
    this.innerHTML = this.compiledTemplate({
      stopId: this.stopId,
      directions: JSON.stringify(this.directions)
    })
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    if (attrName === 'data-stop-id') {
      this.render()
    }
  }

  get stopId() {
    return this.dataset.stopId
  }

  static get observedAttributes() {
    return ['data-stop-id']
  }
}