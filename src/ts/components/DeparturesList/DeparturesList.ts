import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";

const template = require('./DeparturesList.html')

@registerElement('departures-list')
class DeparturesList extends BaseElement {
  departures: any = [];
  directions: any = [];

  constructor() {
    super(template)

    let departures = this.getAttribute('departures')
    let directions = this.getAttribute('directions')

    if (departures) {
      this.departures = JSON.parse(departures)
    }

    if (directions) {
      this.directions = JSON.parse(directions)
    }
  }

  render() {
    this.innerHTML = this.compiledTemplate({
      departures: this.departures,
      directions: this.directions
    })
  }

  static get observedAttributes() {
    return [
      'departures',
      'directions'
    ]
  }
}