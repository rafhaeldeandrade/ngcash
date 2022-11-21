import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    min-height: 100%;
    background: #fff;
    color: #000;
  }

  body {
    text-rendering: optimizeLegibility;
  }

  body, ul, ol, dl {
    margin: 0;
  }

  article, aside, audio,
  footer, header, nav, section, video {
    display: block;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
  }

  textarea {
    resize: vertical;
  }

  table { border-collapse: collapse; }

  td {
    padding: .5rem;
  }

  img {
    border: none;
    max-width: 100%;
  }

  input[type="submit"]::-moz-focus-inner,
  input[type="button"]::-moz-focus-inner {
    border : 0px;
  }

  input[type="search"] {
    -webkit-appearance: textfield;
  }
  input[type="submit"] {
    -webkit-appearance:none;
  }
  input:required:after {
    color: #f00;
    content: " *";
  }

  input[type="email"]:invalid {
    background: #f00;
  }

  sub, sup {
    line-height: 0;
  }
`
