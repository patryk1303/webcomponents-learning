import { BaseElement } from "../../BaseElement";
import { registerElement } from "../../../decorators";

const template = require('./DeparutresTableRow.html')

interface RowData {
  header?: boolean,
  line?: string,
  direction?: string,
  'at-stop'?: boolean,
  departure?: string | number,
  estimated?: boolean
}

@registerElement('deparutres-table-row')
class DeparutresTableRow extends BaseElement {
  rowData: RowData

  constructor() {
    super(template)

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

    if(this.dataset.header) {
      classes.push('departures-table__row--header')
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