import { LitElement, css, html } from 'lit'

export class Details extends LitElement {
  static get properties() {
    return {
      projectName: { type: String },
      costPerHour: { type: Number },
      hours: { type: Number },
      estimatedTimeTo99: { type: Number },
      estimatedTimeTo95: { type: Number },
      estimatedTimeTo68: { type: Number },
    }
  }
  
  constructor() {
    super()
    this.projectName = ''
  }
  
  render() {
    return html`
     <div class="details-section">
      <p>Your project <strong>${this.projectName}</strong> could be about cost: <strong>$${this.costPerHour * this.estimatedTimeTo99.toFixed()}</strong> with <strong>${this.estimatedTimeTo99.toFixed()} Hours </strong></p>
      <h3>Details</h3>
      <table>
        <thead>
          <tr>
            <th>Probability of duration of these activities:</th>
            <th>68%</th>
            <th>95%</th>
            <th>99.7%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hours</td>
            <td>${this.estimatedTimeTo68.toFixed()}</td>
            <td>${this.estimatedTimeTo95.toFixed()}</td>
            <td>${this.estimatedTimeTo99.toFixed()}</td>
          </tr>
        </tbody>
      </table>
     </div> 
    `
  }
  static styles =
    css`
      :host {
        width: 100%;
      }
      .details-section {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        color: #3d4451;
        text-align: left;
        border-radius: 8px;
      }
      table thead tr th {
        padding: 0.5rem;
      }
      table tbody tr td {
        padding: 0.5rem;
      }
      p {
        margin-top: 0;
      }
      h3 {
        margin-top: 0;
        padding: 0;
        color: #fff;
      }
    `
}



customElements.define('view-details', Details)
