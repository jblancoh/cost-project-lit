import { LitElement, css, html } from 'lit'
import './components/table.js'
import {inputStyles} from './input-styles.js'
// "primary": "#3ae082",
          
//  "secondary": "#9dd14b",
          
//  "accent": "#4135a0",
          
//  "neutral": "#1a191f",
          
//  "base-100": "#313036",
          
//  "info": "#879fee",
          
//  "success": "#3be37b",
          
//  "warning": "#94660a",
          
//  "error": "#e62d65",


export class Home extends LitElement {
  static get properties() {
    return {
      projectName: { type: String },
      costPerHour: { type: Number }
    }
  }

  constructor() {
    super()
    this.projectName = 'My Project App'
    this.costPerHour = 0
  } 

  render() {
    return html`
      <slot></slot>
      <div class="card">
        <h1>${this.projectName}</h1>
        <form class="form-project">
          <div class="form-header">
            <div class="form-project">
              <div class="form-control">
                <label for="projectName">Project's name</label>
                <input id="projectName" type="text" placeholder="Enter your project name" @input=${this._changeProjectName}/>
              </div>
              <div class="form-control">
                <label for="costPerHour">Cost per hour $</label>
                <input id="costPerHour" type="text" @input=${this._changeProjectName}/>
                <span>dollars.</span>
              </div>
            </div>
          </div>
          <app-table></app-table>
        </form>
      </div>
      
    `
  }
  
  _changeProjectName(e) {
    const fieldId = e.target.id
    const fieldValue = e.target.value
    this[fieldId] = fieldValue
  }

  static styles = [
    inputStyles,
    css`
      :host {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }
      label {
       font-weight: 700;
      }
      ::slotted(h1) {
        font-size: 3.2em;
        line-height: 1.1;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #4135a0;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }
      
      .form-project {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      
      .form-header {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1em;
        width: 100%;
      }
      
      .form-header .form-project {
        grid-column: 1;
        align-self: flex-start;
      }
      
      .form-control {
        display: flex;
        gap: 1em;
        align-items: center;
        margin-bottom: 1em;
        width: 100%;
      }
      
      .form-control label {
        flex: 0 0 50%;
      }
      
      .form-control
      input:focus,
      input:focus-visible {
        outline-color: #4135a0;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `]
}

window.customElements.define('my-home', Home)
