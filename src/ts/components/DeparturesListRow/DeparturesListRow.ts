import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";

const template = require('./DeparturesListRow.html')

interface RowData {
  header?: boolean,
  line?: string,
  direction?: string,
  'at-stop'?: boolean,
  departure?: string | number,
  estimated?: boolean
}

@registerElement('departures-list-row')
class DeparutresTableRow extends BaseElement {
  rowData: RowData

  constructor() {
    super(template)

    this.classList.add('departures-list__row', ...this.usedClasses)

    this.rowData = {}

    this.rowData.line = this.rowData.line
      ? this.rowData.line
      : 'Linia'

    this.rowData.direction = this.rowData.direction
      ? this.rowData.direction
      : 'Kierunek'

    this.rowData.departure = this.rowData.departure
      ? this.rowData.departure
      : 'Odjazd'
  }

  render() {
    this.innerHTML = this.compiledTemplate({
      rowData: this.rowData,
      usedClasses: this.usedClasses
    })
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    super.attributeChangedCallback(attrName, oldVal, newVal)

    this.rowData[attrName] = newVal
  }

  get usedClasses() : string[] {
    let classes : string[] = []

    if(this.getAttribute('header') === 'true') {
      classes.push('departures-list__row--header')
    }

    return classes
  }

  static get observedAttributes() {
    return [
      'header',
      'line',
      'direction',
      'at-stop',
      'departure',
      'estimated'
    ]
  }
}