import moment from 'moment'

import { BaseElement } from "../BaseElement";
import { registerElement } from '../../decorators';

const template = require('./LineData.html')

@registerElement('line-data')
class LineData extends BaseElement {
  intervalId: NodeJS.Timeout;

  constructor() {
    super(template)

    this.intervalId = setInterval(this.render.bind(this), 1000)
  }

  render() {
    this.innerHTML = this.compiledTemplate({
      clock: this.clock
    })
  }

  get clock() : string {
    return moment().format('HH:mm:ss')
  }

  static get observedAttributes() {
    return []
  }
}