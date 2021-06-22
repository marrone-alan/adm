import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

// actionType
import { FETCH_OPERATIONAL_TABLE } from '../../../actions/actionTypes';
import { fetchOperationalTable } from '../../../actions/report/operational';
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

let TableOperational = (props) => {
  // initial page value 1
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (data) => {
    const { user, profile, initial_date, final_date } =
      props.formOperational.values;
    const page = data.selected + 1;

    setCurrentPage(page);

    props.fetchOperationalTable(user, profile, initial_date, final_date, page);
  };

  if (props.isFetching) {
    return <Loader />;
  }

  if (!props.operational) return 'Selecione um período para gerar o relatório';

  if (
    Object.keys(props.operational.data).length === 0 &&
    props.operational.constructor === Object
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
          </Tr>
        </Thead>
        <Tbody>
          {props.operational.data.map((value, index) => {
            return (
              <Tr key={index}>
                <Td>{value.firstName}</Td>
                <Td>{value.status}</Td>
                <Td>{value.system}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        pageCount={props.operational.last_page}
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

const loadingSelector = createLoadingSelector([FETCH_OPERATIONAL_TABLE]);

const mapStateToProps = (store) => {
  return {
    formOperational: store.form.formOperational,
    operational: store.operational.data,
    isFetching: loadingSelector(store),
  };
};

TableOperational = connect(mapStateToProps, { fetchOperationalTable })(
  TableOperational
);

export default TableOperational;
