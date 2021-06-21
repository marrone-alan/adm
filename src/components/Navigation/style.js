import styled from 'styled-components';
import { colors, screenSize } from '../../styles/variables';

export const Hamburguer = styled.span`
  left: ${(props) => (props.showMenu ? '-2rem' : '0px')};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 3%;
  border-radius: 0 0.25rem 0.25rem 0px;
  width: 2rem;
  height: 2rem;
  background-color: ${colors.darker};

  transition-delay: 0.6s;
  transition: left 0.6s ease;
`;

export const Wrapper = styled.nav`
  height: 100vh;
  width: 18rem;
  position: fixed;
  visibility: ${(props) => (props.showMenu ? 'visible' : 'hidden')};
  z-index: 1;
  background: ${colors.darker};
  color: white;
  transition: left 0.3s ease;

  svg {
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: ${colors.light};

      svg path {
        fill: ${colors.primary} !important;
      }
    }
  }

  @media (max-width: ${screenSize.md}) {
    visibility: ${(props) => (props.showMenu ? 'visible' : 'hidden')};
    height: 100%;
    width: 100%;
  }
`;

export const Content = styled.div`
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

export const Featured = styled.div`
  height: 8%;
  min-height: 3rem;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #def2ff6e;

  h1,
  h2 {
    cursor: pointer;
  }

  h1:hover,
  h2:hover {
    color: ${colors.light};
  }
`;

export const Menu = styled.div`
  padding-top: 1.25rem;

  ul li a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    position: relative;
    padding: 0.5rem 3.5rem 0.5rem 1.25rem;
  }
`;

export const DropDown = styled.li`
  display: block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const DropDownEnable = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 0.5rem 3.5rem 0.5rem 1.25rem;
  cursor: pointer;
`;

export const IconSubmenu = styled.span`
  position: absolute;
  right: 1.25rem;
  top: 0.93rem;
`;

export const SvgWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  height: 1.87rem;
  width: 1.87rem;
  background-color: ${colors.lighter};
  border-radius: 3px;
`;

export const SubMenu = styled.div`
  visibility: ${(props) =>
    props.showSubMenu && props.showMenu ? 'visible' : 'hidden'};
  opacity: ${(props) => (props.showSubMenu ? '1' : '0')};
  height: ${(props) => (props.showSubMenu ? 'auto' : '0')};
  transition-delay: 0.3s;
  transition: opacity 0.6s ease;

  div {
    background-color: ${colors.dark};
    opacity: ${(props) => (props.showSubMenu ? '1' : '0')};

    ul {
      padding: 0.31rem 0;

      li {
        padding-left: 1.56rem;
        font-size: 0.9rem;

        a:before {
          content: '-';
          display: inline-block;
          text-decoration: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin-right: 0.625rem;
        }
      }
    }
  }
`;
