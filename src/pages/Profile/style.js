import styled from 'styled-components';

import { Container } from '../../styles/align';
import { Button } from '../../styles/form';
import { screenSize } from '../../styles/variables';

export const ContainerCenter = styled(Container)`
  justify-content: center;
  align-items: center;
`;

export const NavButton = styled(Button)`
  height: 72px;
  width: 50%;
  padding: 0;
  @media (max-width: ${screenSize.md}) {
    width: 100%;
  }

  a {
    color: white;
    text-decoration: none;
    display: block;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
