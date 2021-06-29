import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiSquareEditOutline } from '@mdi/js';
import Modal from 'react-modal';
import { Field, reduxForm, SubmissionError } from 'redux-form';

// actionType
import {
  fetchSystem,
  addSystem,
  deleteSystem,
} from '../../../actions/resource/system';
import {
  FETCH_SYSTEM,
  DELETE_SYSTEM,
  ADD_SYSTEM,
} from '../../../actions/actionTypes';
// form
import RenderField from '../../../components/Form/renderField';
// components
import Loader from '../../../components/Loader';
// style
import {
  Button,
  Form,
  WrapperLabel,
  WrapperButton,
} from '../../../styles/form';
import {
  TableWrapper,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
} from '../../../styles/table';
import { Title } from '../../../styles/title';
import { Container, Separator, Row } from '../../../styles/align';
import { modalStyle } from '../../../styles/variables';
// services
import { createLoadingSelector } from '../../../services/selectors';
import { getErrors, clearErrors } from '../../../services/storage';

let SystemTable = (props) => {
  const { handleSubmit, submitting, pristine, reset } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchSystem();
    // eslint-disable-next-line
  }, []);

  function openModal(id) {
    setCurrentId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setCurrentId(0);
    setIsOpen(false);
  }

  function openModalEdit(formValues) {
    if (formValues) {
      props.change('name', formValues.name);
      props.change('link', formValues.link);
    } else {
      props.change('name', '');
      props.change('link', '');
    }

    setIsOpenEdit(true);
  }

  function closeModalEdit() {
    reset();
    setIsOpenEdit(false);
  }

  if (props.isFetching) return <Loader />;

  function submitDetele() {
    props.deleteSystem(currentId).then(() => {
      setIsOpen(false);
    });
  }

  const handleEditSubmit = async (values) => {
    return props.addSystem(values).then(() => {
      const formError = getErrors();
      if (formError !== null) {
        clearErrors();
        localStorage.removeItem('formError');
        throw new SubmissionError(formError);
      } else {
        props.reset();
        closeModalEdit();
      }
    });
  };

  if (!props.systems) return <Loader />;

  if (props.systems.length === 0) return 'Cade os dados';

  return (
    <>
      <Row>
        <Button type="button" onClick={() => openModalEdit(null)}>
          Novo Sistema
        </Button>
      </Row>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Link</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.systems.map((system, index) => {
              return (
                <Tr key={index}>
                  <Td>{system.name}</Td>
                  <Td>{system.link}</Td>
                  <Td>
                    <Icon
                      onClick={() => openModal(index)}
                      path={mdiCloseBox}
                      size={1}
                      color="#000"
                    />
                    <Icon
                      onClick={() => openModalEdit(system)}
                      path={mdiSquareEditOutline}
                      size={1}
                      color="#000"
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableWrapper>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <Title>Excluir sistema</Title>
        <Separator />
        <Container>
          {props.isSubmitting ? (
            <Loader />
          ) : (
            <>
              Tem certeza que deseja excluir o sistema?
              <WrapperButton>
                <Button type="button" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button
                  type="button"
                  disabled={props.isSubmitting}
                  onClick={submitDetele}
                >
                  Excluir
                </Button>
              </WrapperButton>
            </>
          )}
        </Container>
      </Modal>
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={closeModalEdit}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <Title>Cadastrar sistema </Title>
        <Separator />
        <Container>
          {props.isSubmittingEdit ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(handleEditSubmit)}>
              <WrapperLabel>
                <Field
                  component={RenderField}
                  type="text"
                  name="name"
                  placeholder="Nome"
                  label="Nome"
                />
              </WrapperLabel>
              <WrapperLabel>
                <Field
                  component={RenderField}
                  type="text"
                  name="link"
                  placeholder="Link"
                  label="Link"
                />
              </WrapperLabel>
              <WrapperButton>
                <Button type="button" onClick={closeModalEdit}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={submitting || pristine}>
                  Salvar
                </Button>
              </WrapperButton>
            </Form>
          )}
        </Container>
      </Modal>
    </>
  );
};

const loadingSelector = createLoadingSelector([FETCH_SYSTEM]);
const loadingSelectorDelete = createLoadingSelector([DELETE_SYSTEM]);
const loadingSelectorAdd = createLoadingSelector([ADD_SYSTEM]);

SystemTable = reduxForm({
  form: 'formSystem',
})(SystemTable);

const mapStateToProps = (store) => {
  return {
    systems: store.system.systems,
    isFetching: loadingSelector(store),
    isSubmitting: loadingSelectorDelete(store),
    isSubmittingEdit: loadingSelectorAdd(store),
  };
};

SystemTable = connect(mapStateToProps, {
  addSystem,
  deleteSystem,
  fetchSystem,
})(SystemTable);

Modal.setAppElement('#root');

export default SystemTable;
