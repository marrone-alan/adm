import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import Icon from '@mdi/react';
import { mdiCloseBox } from '@mdi/js';

// actionType
import {
  FETCH_IP_ADDRESS_TABLE,
  DELETE_IP_ADDRESS,
} from '../../actions/actionTypes';
// actions
import { fetchIPAddressTable, deleteIPAddress } from '../../actions/ipAddress';
// components
import Loader from '../../components/Loader';
// style
import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '../../styles/table';
import { Button, WrapperButton } from '../../styles/form';
import { modalStyle } from '../../styles/variables';
import { Title } from '../../styles/title';
import { Container, Separator } from '../../styles/align';
// services
import { createLoadingSelector } from '../../services/selectors';
// variable
import { paginate } from '../../config';

let TableIPAddress = (props) => {
  // initial page value 1
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  function openModal(id) {
    setCurrentId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function submitDeteleIp() {
    props.deleteIPAddress(currentId).then(() => {
      setIsOpen(false);
    });
  }

  useEffect(() => {
    props.fetchIPAddressTable(currentPage);
    // eslint-disable-next-line
  }, []);

  const handlePageClick = (data) => {
    const nextPage = data.selected + 1;
    setCurrentPage(nextPage);

    props.fetchIPAddressTable(nextPage);
  };

  if (props.isFetching) {
    return <Loader />;
  }

  if (!props.ipAddress) return '';

  if (props.page && props.page !== currentPage) {
    setCurrentPage(props.page);
  }

  if (
    Object.keys(props.ipAddress.data).length === 0 &&
    props.ipAddress.constructor === Object
  )
    return 'Cade os dados';

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th>IP</Th>
            <Th>Descrição</Th>
            <Th>Data Inclusão</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.ipAddress.data.map((value, index) => {
            return (
              <Tr key={index}>
                <Td>{value.firstName}</Td>
                <Td>{value.status}</Td>
                <Td>{value.system}</Td>
                <Td>
                  <Icon
                    onClick={() => openModal(index)}
                    path={mdiCloseBox}
                    size={1}
                    color="#000"
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        pageCount={props.ipAddress.last_page}
        marginPagesDisplayed={paginate.marginPagesDisplayed}
        pageRangeDisplayed={paginate.pageRangeDisplayed}
        forcePage={currentPage - 1}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <Title>Excluir permissão de IP</Title>
        <Separator />
        <Container>
          {props.isSubmitting ? (
            <Loader />
          ) : (
            <>
              Tem certeza que deseja excluir a permissão de acesso desse IP?
              <WrapperButton>
                <Button type="button" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button
                  type="button"
                  disabled={props.isSubmitting}
                  onClick={submitDeteleIp}
                >
                  Excluir
                </Button>
              </WrapperButton>
            </>
          )}
        </Container>
      </Modal>
    </TableWrapper>
  );
};

const loadingSelector = createLoadingSelector([FETCH_IP_ADDRESS_TABLE]);

const loadingSelectorModal = createLoadingSelector([DELETE_IP_ADDRESS]);

const mapStateToProps = (store) => {
  return {
    ipAddress: store.ipAddress.dataTable,
    page: store.ipAddress.page,
    isFetching: loadingSelector(store),
    isSubmitting: loadingSelectorModal(store),
  };
};

TableIPAddress = connect(mapStateToProps, {
  fetchIPAddressTable,
  deleteIPAddress,
})(TableIPAddress);

Modal.setAppElement('#root');

export default TableIPAddress;
