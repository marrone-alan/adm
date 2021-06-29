import React from 'react';
import { connect } from 'react-redux';

// styles
import { Page, Container, Separator } from '../../../styles/align';
import { Title } from '../../../styles/title';
// component
import Table from './table';
import Form from './form';

let Action = (props) => {
  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>Ações</Title>
        <Separator />
        <Form />
        <Table />
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  isMenuVisible: store.menu.isMenuVisible,
});

export default connect(mapStateToProps)(Action);
