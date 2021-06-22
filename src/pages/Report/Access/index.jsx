import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//actions
import { clearAccessTable } from '../../../actions/report/access';
// styles
import { Page, Container, Separator } from '../../../styles/align';
import { Title } from '../../../styles/title';
// component
import Table from './table';
import Form from './form';

let Access = (props) => {
  useEffect(() => {
    return () => {
      props.clearAccessTable();
    };
  });

  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>Relatório de Acessos</Title>
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

export default connect(mapStateToProps, { clearAccessTable })(Access);
