import React from 'react';

// components
import Form from './form';
// styles
import { Page, Container, Img, FormContainer } from './style';
// assets
import image from '../../assets/images/moria-login.jpg';
// services
import { isAuthenticated } from '../../services/auth';
// config
import { urlRedirect } from '../../config';

const SignIn = (props) => {
  // if user are logged, redirects to the homepage
  if (isAuthenticated()) {
    props.history.push(urlRedirect);
  }

  return (
    <Page>
      <Container>
        <FormContainer>
          <Form />
        </FormContainer>
        <Img src={image} alt="Doors of Durin" />
      </Container>
    </Page>
  );
};

export default SignIn;
