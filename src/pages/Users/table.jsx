import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// actionType
import { fetchUsers } from '../../actions/users';
import { FETCH_USERS } from '../../actions/actionTypes';
// components
import Loader from '../../components/Loader';
// style
import {
  TableWrapper,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
} from '../../styles/table';
// services
import { createLoadingSelector } from '../../services/selectors';

let TableUsers = (props) => {
  useEffect(() => {
    props.fetchUsers();
    // eslint-disable-next-line
  }, []);

  if (props.isFetching) {
    return <Loader />;
  }

  if (!props.users) return <Loader />;

  if (props.users.length === 0) return 'Cade os dados';

  return (
    <>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>Login</Th>
              <Th>Data inclusão</Th>
              <Th>Último acesso</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.users.map((user, index) => {
              return (
                <Tr key={index}>
                  <Td>{user.login}</Td>
                  <Td>{user.date_inc}</Td>
                  <Td>{user.date_access}</Td>
                  <Td>{user.status}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableWrapper>
    </>
  );
};

const loadingSelector = createLoadingSelector([FETCH_USERS]);

const mapStateToProps = (store) => {
  return {
    users: store.users.users,
    isFetching: loadingSelector(store),
  };
};

TableUsers = connect(mapStateToProps, {
  fetchUsers,
})(TableUsers);

export default TableUsers;
