import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// actionType
import { FETCH_ACCOUNT_DATA } from '../../../actions/actionTypes';
// actions
import { fetchAccountData } from '../../../actions/profile/account';
// components
import Loader from '../../../components/Loader';
// styles
import { Page, Separator, Container, Row } from '../../../styles/align';
import { Title, SubTitle } from '../../../styles/title';
import { Status } from './style';
// services
import { createLoadingSelector } from '../../../services/selectors';

let Account = (props) => {
  const { account, isFetching } = props;

  useEffect(() => {
    if (!account) props.fetchAccountData();
    // eslint-disable-next-line
  }, []);

  const renderData = () => {
    if (isFetching) return <Loader />;

    if (!account) return '';

    if (account.length === 0) return 'Cade os dados';

    return account.map((data) => {
      return (
        <>
          <SubTitle>{data.firstName}</SubTitle>
          <Row>
            {data.status.map((status) => {
              return <Status>{status}</Status>;
            })}
          </Row>
        </>
      );
    });
  };

  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>Minha Conta</Title>
        <Separator />
        {renderData()}
      </Container>
    </Page>
  );
};

const loadingSelector = createLoadingSelector([FETCH_ACCOUNT_DATA]);

const mapStateToProps = (store) => ({
  isMenuVisible: store.menu.isMenuVisible,
  isFetching: loadingSelector(store),
  account: store.account.data,
});

Account = connect(mapStateToProps, { fetchAccountData })(Account);

export default Account;
