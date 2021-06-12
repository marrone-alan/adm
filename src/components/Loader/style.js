import styled from 'styled-components';

// style
import { Row } from '../../styles/align';
import { colors } from '../../styles/variables';

export const LoaderStyle = styled(Row)`
  display: flex;
  max-height: 400px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  padding: '4rem 0';

  div {
    height: fit-content;
    display: flex;
    justify-content: center;
    position: relative;
    margin: 2rem 0;

    &:after {
      position: absolute;
      content: 'Carregando';
      bottom: -2rem;
      color: ${colors.primary};
      font-weight: 600;
    }
  }
`;
