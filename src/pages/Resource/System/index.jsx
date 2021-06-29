import React from 'react';
import { connect } from 'react-redux';

// styles
import { Page, Container, Separator } from '../../../styles/align';
import { Title } from '../../../styles/title';
// component
import Table from './table';

let System = (props) => {
  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>Sistemas</Title>
        <Separator />
        <Table />
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  isMenuVisible: store.menu.isMenuVisible,
});

export default connect(mapStateToProps)(System);
