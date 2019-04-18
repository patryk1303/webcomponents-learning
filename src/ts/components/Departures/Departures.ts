import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";

const template = require('./Departures.html')

interface DepartureRow {
  direction_id: number,
  vehicle_type: number,
  at_stop: boolean,
  time: string,
  line_name: string,
  is_estimated: boolean
}

interface Departure {
  only_disembarking: boolean,
  timestamp: number,
  departure_time_limit: number,
  rows: DepartureRow[],
  directions: any[]
}

@registerElement('departures-table')
class Departures extends BaseElement {
  departures: any;
  intervalId: NodeJS.Timeout;

  constructor() {
    super(template)

    this.departures = []

    clearInterval(this.intervalId)

    this.intervalId = setInterval(this.fetchDepartures.bind(this), 15000)
  }

  fetchDepartures() {
    fetch(`http://koszalin.kiedyprzyjedzie.pl/api/departures/${this.dataset.stopId}`)
      .then(data => data.json())
      .then(data => {
        this.departures = data
        this.render()
      })
      .catch(reason => console.error(reason))
  }

  render() {
    const templateData = {
      departures: this.departures.rows,
      directions: this.departures.directions
    };

    // console.trace(templateData)

    this.innerHTML = this.compiledTemplate(templateData)
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    if(attrName === 'data-stop-id') {
      console.log('aa')
      this.fetchDepartures()
    } else {
      this.render()
    }
  }

  static get observedAttributes() {
    return [
      'data-stop-id'
    ]
  }
}