import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

// actionType
import { FETCH_REPORT_ACCESS_TABLE } from '../../../actions/actionTypes';
import { fetchReportAccessTable } from '../../../actions/profile/reportAccess';
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

let TableReportAccess = (props) => {
  // initial page value 1
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (data) => {
    const { initial_date, final_date } = props.formReportAccess.values;
    const page = data.selected + 1;

    setCurrentPage(page);

    props.fetchReportAccessTable(initial_date, final_date, page);
  };

  if (props.isFetching) {
    return <Loader />;
  }

  if (!props.reportAccess) return 'Selecione um período para gerar o relatório';

  if (
    Object.keys(props.reportAccess.data).length === 0 &&
    props.reportAccess.constructor === Object
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
          {props.reportAccess.data.map((value, index) => {
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
        pageCount={props.reportAccess.last_page}
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

const loadingSelector = createLoadingSelector([FETCH_REPORT_ACCESS_TABLE]);

const mapStateToProps = (store) => {
  return {
    formReportAccess: store.form.formReportAccess,
    reportAccess: store.reportAccess.data,
    isFetching: loadingSelector(store),
  };
};

TableReportAccess = connect(mapStateToProps, { fetchReportAccessTable })(
  TableReportAccess
);

export default TableReportAccess;
