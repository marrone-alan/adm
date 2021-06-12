import styled from 'styled-components';

const H1 = styled.h1`
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-family: 'Apex Mk3';
  text-align: left;
`;

export const Logo = styled(H1)`
  font-weight: 200;
`;

export const Title = styled(H1)`
  font-weight: 500;
  line-height: 2rem;
  padding: 0.5rem;
`;

export const SubTitle = styled.h2`
  text-align: left;
  font-family: 'Redwing';
  letter-spacing: 0.1rem;
  font-weight: 300;
`;
