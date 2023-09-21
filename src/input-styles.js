import { css } from 'lit'

export const inputStyles = css`
    input {
      width: 100%;
      padding: 0.5em;
      border-radius: 4px;
      border: 1px solid #ccc;
      background-color: #fff;
      color: #3d4451;
    }
    table tr:nth-child(even) input {
      background-color: #d1d0d2;
    }
    input:focus {
      outline: 4px auto -webkit-focus-ring-color;
    }
    input::placeholder {
      color: #ccc;
    } 
  `
