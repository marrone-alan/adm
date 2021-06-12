import styled from 'styled-components';
import { colors, screenSize } from './variables';

export const Page = styled.div`
  min-height: 100vh;
  padding: 3rem 3rem 3rem ${(props) => (props.menuActive ? '20rem' : '3rem')};
  background-color: ${colors.background};

  @media (max-width: ${screenSize.md}) {
    padding: 4rem 0.5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: inherit;
`;

export const Row = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  justify-content: flex-start;

  @media (max-width: ${screenSize.md}) {
    flex-direction: column;
  }
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Separator = styled.hr`
  border: 1px solid #777;
  margin-bottom: 1rem;
`;
