import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

// actionType
import { FETCH_ACCESS_TABLE } from '../../../actions/actionTypes';
import { fetchAccessTable } from '../../../actions/report/access';
// components
import Loader from '../../../components/Loader';
// style
import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '../../../styles/table';
// services
import { createLoadingSelector } from '../../../services/selectors';
// variable
import { paginate } from '../../../config';

let TableAccess = (props) => {
  // initial page value 1
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (data) => {
    const { user, profile, initial_date, final_date } = props.formAccess.values;
    const page = data.selected + 1;

    setCurrentPage(page);

    props.fetchAccessTable(user, profile, initial_date, final_date, page);
  };

  if (props.isFetching) {
    return <Loader />;
  }

  if (!props.access) return 'Selecione um período para gerar o relatório';

  if (
    Object.keys(props.access.data).length === 0 &&
    props.access.constructor === Object
  )
    return 'Cade os dados';

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th>Usuário</Th>
            <Th>Status</Th>
            <Th>Sistema</Th>
            <Th>Data Acesso</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.access.data.map((value, index) => {
            return (
              <Tr key={index}>
                <Td>{value.firstName}</Td>
                <Td>{value.status}</Td>
                <Td>{value.system}</Td>
                <Td>{value.date}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        pageCount={props.access.last_page}
        marginPagesDisplayed={paginate.marginPagesDisplayed}
        pageRangeDisplayed={paginate.pageRangeDisplayed}
        forcePage={currentPage - 1}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </TableWrapper>
  );
};

const loadingSelector = createLoadingSelector([FETCH_ACCESS_TABLE]);

const mapStateToProps = (store) => {
  return {
    formAccess: store.form.formAccess,
    access: store.access.data,
    isFetching: loadingSelector(store),
  };
};

TableAccess = connect(mapStateToProps, { fetchAccessTable })(TableAccess);

export default TableAccess;
