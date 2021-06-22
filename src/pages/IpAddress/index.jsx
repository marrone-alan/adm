import React from 'react';
import { connect } from 'react-redux';

// styles
import { Page, Container, Separator } from '../../styles/align';
import { Title } from '../../styles/title';
// component
import Table from './table';
import ModalNewIPAddress from './modalNewIPAddress';

let IPAddress = (props) => {
  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>IPs Permitidos</Title>
        <Separator />
        <ModalNewIPAddress />
        <Table />
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  isMenuVisible: store.menu.isMenuVisible,
});

export default connect(mapStateToProps, null)(IPAddress);
