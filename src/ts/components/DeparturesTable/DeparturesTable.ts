import { BaseElement } from "../BaseElement";
import { registerElement } from "../../decorators";

const template = require('./DeparturesTable.html')

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
class DeparturesTable extends BaseElement {
  departures: Departure;
  intervalId: NodeJS.Timeout;

  constructor() {
    super(template)

    this.classList.add('departures-table')

    this.setupInterval()
  }
  
  setupInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

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
    if (this.departures) {
      const templateData = {
        departures: JSON.stringify(this.departures.rows),
        directions: JSON.stringify(this.departures.directions)
      }
      
      this.innerHTML = this.compiledTemplate(templateData)
    }
  }

  disconnectedCallback() {
    clearInterval(this.intervalId)
  }

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any) {
    if(attrName === 'data-stop-id') {
      this.setupInterval()
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