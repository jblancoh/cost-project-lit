// lit component

import { LitElement, css, html } from 'lit'
import {inputStyles} from '../input-styles.js'
import { map } from 'lit/directives/map.js';

export class Table extends LitElement {
  static get properties() {
    return {
      tableData: { type: Array },
      changeHours: { type: Function },
    }
  }

  constructor() {
    super()
    this.tableData = [
      { activityName: 'Login screen', optimisticTime: '8', mostLikelyTime: '12', pessimisticTime: '24', pert: '13.3', standardDeviation: '2.66', variance: '7.11' },
    ];
  }

  render() {
    return html`
      <div class="form-body">
        <table>
          <thead class="table-header">
            <tr>
              <th>#</th>
              <th>Activities name</th>
              <th>Optimistic Time</th>
              <th>Most Likely Time</th>
              <th>Pessimistic Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          ${map(this.tableData, (row, index) => html`
            <tr>
              <td>${index+1}</td>
              <td>
                <div class="td-section">
                  <input
                    type="text"
                    aria-label="Activity name"
                    name="activity-name"
                    .value="${row.activityName}"
                    @input="${(e) => this._updateInput(e, row, 'activityName')}"
                  />
                </div>
              </td>
              <td>
                <div class="td-section">
                  <input
                    type="number"
                    aria-label="Optimistic time"
                    name="optimistic-time"
                    .value="${row.optimisticTime}"
                    @input="${(e) => this._updateInput(e, row, 'optimisticTime')}"
                  />
                  <span>hours.</span>
                </div>
              </td>
              <td>
                <div class="td-section">
                  <input
                    type="text"
                    aria-label="Most likely time"
                    name="most-likely-time"
                    .value="${row.mostLikelyTime}"
                    @input="${(e) => this._updateInput(e, row, 'mostLikelyTime')}"
                  />
                  <span>hours.</span>
                </div>
              </td>
              <td>
                <div class="td-section">
                  <input
                    type="text"
                    aria-label="Pessimistic time"
                    name="pessimistic-time"
                    .value="${row.pessimisticTime}"
                    @input="${(e) => this._updateInput(e, row, 'pessimisticTime')}"
                  />
                  <span>hours.</span>
                </div>
              </td>
              <td>
                <button
                  aria-label="Remove activity ${index}"
                  name="remove-activity"
                  @click=${() => this._removeElement(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          `)}
          </tbody>
        </table>
        <div class="button-section">
          <button 
            @click=${this._addRow}
            aria-label="Add activity"
            name="add-activity"
            class="btn-primary"
          >
            Add activity
          </button>
        </div>
      </div>
    `
  }
  
  _updateInput(event, row, propName) {
    row[propName] = event.target.value;
    if(propName !== 'activityName') {
      this._onPert(row);
    }
  }
  
  _onPert(row) {
    let pert = Number(this.tableData[0]?.pert || 0)
    let variance = Number(this.tableData[0]?.variance || 0)
    let standardDeviation = Number(this.tableData[0]?.standardDeviation || 0)
    if(row) {
      pert = (Number(row.optimisticTime) + (4 * Number(row.mostLikelyTime)) + Number(row.pessimisticTime)) / 6;
      row.pert = pert.toFixed(2);
      standardDeviation = (Number(row.pessimisticTime) - Number(row.optimisticTime)) / 6;
      row.standardDeviation = standardDeviation.toFixed(2);
      variance = standardDeviation ** 2;
      row.variance = variance.toFixed(2);
    }
    
    let totalPert = 0;
    let totalVariance = 0;
    let totalStandardDeviation = 0;
    
    if (this.tableData.length > 1) {
      totalPert = this.tableData.reduce((acc, row) => acc + Number(row.pert), 0);
      totalVariance = this.tableData.reduce((acc, row) => acc + Number(row.variance), 0);
      totalStandardDeviation = Math.sqrt(totalVariance);
    } else {
      totalPert = pert;
      totalVariance = Number(variance);
      totalStandardDeviation = Number(standardDeviation);
    }
    

    const estimatedTimeTo99 = totalPert + (totalStandardDeviation * 3);
    const estimatedTimeTo95 = totalPert + (totalStandardDeviation * 2);
    const estimatedTimeTo68 = totalPert + totalStandardDeviation;
    
    this.changeHours({
      estimatedTimeTo99,
      estimatedTimeTo95,
      estimatedTimeTo68,
    });
  }

  _addRow() {
    const newRow = {
      activityName: '',
      optimisticTime: '',
      mostLikelyTime: '',
      pessimisticTime: '',
    };
    this.tableData = [...this.tableData, newRow];
  }
  
  _removeElement(index) {
    this.tableData = this.tableData.filter((_, i) => i !== index);
    this._onPert();
  }
  
  static styles = [
    inputStyles,
    css`
      :host {
        width: 100%;
      }
      .form-body {
        display: grid;
        grid-template-rows: 2fr 1fr;
        gap: 1rem;
        width: 100%;
        align-items: start;
        justify-items: start;
      }
      .table-header {
        color: #3d4451;
        
      }
      .table-header th {
        padding: 1rem;
        margin: 0;
        
      }
      table {
        border-spacing: 0.1;
        width: 100%;
        background-color: #ffffff;
        border-radius: 8px;
        
      }
      
      table td {
        background-color: #ffffff;
        padding: 1rem;
        margin: 0px;
        color: #3d4451;
      }
      table tr:nth-child(odd) td {
        background-color: #c4c6c8;
      }
      button {
        background-color: #94660a;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-weight: 700;
        font-size: 1rem;
        padding: 0.8rem 1rem;
      }
      button:hover {
        opacity: 0.8;
      }
      input {
        border: 0;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        width: 100%;
        box-sizing: border-box;
      }
      .btn-primary {
        background-color: #3ae082;
        color: #3d4451;
      }
      .td-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 0.8rem;
        height: 100%;
        gap: 0.5rem;
      }
      `
    ]
}

customElements.define('app-table', Table)