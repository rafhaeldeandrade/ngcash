import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

  @font-face {
  font-family: 'AtypDisplay-Medium';
  font-style: normal;
  src: local('AtypDisplay-Medium'), url(AtypDisplay-Medium.ttf) format('truetype');
}

  * {
    box-sizing: border-box;
    /* outline: 1px solid red;
    outline-offset: -1px; */
  }
  html, body {
    min-height: 100%;
    background: #f7f6f7;
    color: #000;
  }

  body {
    font-family: "AtypDisplay-Medium", sans-serif;
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

  button {
    border: none;
    font-family: 'AtypDisplay-Medium', sans-serif;
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
