import { createGlobalStyle } from 'styled-components';
import { colors } from './variables';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: 0;
  }

  body {
    font-family: 'Gontserrat';
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    height: 100%;
    width: 100%;
    line-height: 1.5rem;
    font-size: 1rem;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      -webkit-box-shadow: 0 0 0 30px #e6e5e5 inset !important;
  }

  .Toastify__toast {
    width: 80%;
    margin: 20px auto;
    border-radius: 5px !important; 
    font-weight: normal;
    text-align: center;
    
    @media (min-width: 768px) {
      width: 100%;
      margin: auto;
    }
  }

  
// pagination
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  height: 2rem;
}

.pagination li.active {
  background-color: ${colors.dark};
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: ${colors.darker};
  }
}

.pagination li:hover:not(.active) {
  background-color: ${colors.lighter};
  border-radius: 5px;
}

.pagination li {
  color: black;
  float: left;
  text-decoration: none;
  list-style-type: none;
  cursor: pointer;
  margin-right: .5rem;

  a {
    padding: 5px 16px;
    height: 100%;
    display: block;
  }

  &:first-of-type {
    color: ${colors.secondary};
    border-radius: 5px;
  }

  &:last-of-type {
    color: ${colors.secondary};
    border-radius: 5px;
  }

  &:last-of-type {
    margin-right: 0;
  }

  &.previous {
    background-color: ${colors.dark};

    &:hover {
      background-color: ${colors.darker};
    }
  }

  &.next {
    background-color: ${colors.dark};

    &:hover {
      background-color: ${colors.darker};
    }
  }
}
`;

export default GlobalStyle;
