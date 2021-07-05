import React from 'react';
import { connect } from 'react-redux';

// styles
import { Page, Container, Separator } from '../../../styles/align';
import { Title } from '../../../styles/title';
// component
import Form from './form';

let PersonalData = (props) => {
  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>Dados Pessoais</Title>
        <Separator />
        <Form />
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  isMenuVisible: store.menu.isMenuVisible,
});

export default connect(mapStateToProps)(PersonalData);
