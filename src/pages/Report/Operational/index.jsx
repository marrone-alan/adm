import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//actions
import { clearOperationalTable } from '../../../actions/report/operational';
// styles
import { Page, Container, Separator } from '../../../styles/align';
import { Title } from '../../../styles/title';
// component
import Table from './table';
import Form from './form';

let Operational = (props) => {
  useEffect(() => {
    return () => {
      props.clearOperationalTable();
    };
  });

  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>Relatório Operacional</Title>
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

export default connect(mapStateToProps, { clearOperationalTable })(Operational);
