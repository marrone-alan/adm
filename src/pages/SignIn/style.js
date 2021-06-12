import styled from 'styled-components';
import { Container as ContainerAlign } from '../../styles/align';
import { colors } from '../../styles/variables';
import { Form as FormStyle } from '../../styles/form';

// width of the 'moria' file determines when to hide the image
const imgSize = '1010px';

export const Page = styled.div`
  height: 100vh;
  background-color: ${colors.background};
`;

export const Container = styled(ContainerAlign)`
  justify-content: center;

  @media (min-width: ${imgSize}) {
    justify-content: space-around;
    flex-direction: row;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Img = styled.img`
  height: 0;

  @media (min-width: ${imgSize}) {
    height: 100vh;
  }
`;

// formLogin
export const Form = styled(FormStyle)`
  @media (min-width: ${imgSize}) {
    width: 400px;
  }
`;
