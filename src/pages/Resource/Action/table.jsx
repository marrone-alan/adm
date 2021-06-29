import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiSquareEditOutline } from '@mdi/js';
import Modal from 'react-modal';
import { Field, reduxForm, SubmissionError } from 'redux-form';

// actionType
import {
  fetchAction,
  addAction,
  deleteAction,
} from '../../../actions/resource/action';
import {
  FETCH_ACTION,
  DELETE_ACTION,
  ADD_ACTION,
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
  WrapperLabelRow,
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
import { Container, Separator, Row, Col } from '../../../styles/align';
import { modalStyle } from '../../../styles/variables';
// services
import { createLoadingSelector } from '../../../services/selectors';
import { getErrors, clearErrors } from '../../../services/storage';

let TableAction = (props) => {
  const { handleSubmit, submitting, pristine, reset } = props;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAction();
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
      props.change('action', formValues.action);
      props.change('system', formValues.system);
      props.change('controller', formValues.controller);
      props.change('module', formValues.module);
      props.change('desc', formValues.desc);
    } else {
      props.change('action', '');
      props.change('system', 0);
      props.change('controller', 0);
      props.change('module', 0);
      props.change('desc', '');
    }

    setIsOpenEdit(true);
  }

  function closeModalEdit() {
    reset();
    setIsOpenEdit(false);
  }

  if (props.isFetching) {
    return <Loader />;
  }

  function submitDetele() {
    props.deleteAction(currentId).then(() => {
      setIsOpen(false);
    });
  }

  const handleEditSubmit = async (values) => {
    return props.addAction(values).then(() => {
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

  if (!props.actions) return <Loader />;

  if (props.actions.length === 0) return 'Cade os dados';

  return (
    <>
      <Row>
        <Button type="button" onClick={() => openModalEdit(null)}>
          Nova Ação
        </Button>
      </Row>
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>Ação</Th>
              <Th>Controlador</Th>
              <Th>Módulo</Th>
              <Th>Sistema</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.actions.map((action, index) => {
              return (
                <Tr key={index}>
                  <Td>{action.action}</Td>
                  <Td>{action.controller}</Td>
                  <Td>{action.module}</Td>
                  <Td>{action.system}</Td>
                  <Td>
                    <Icon
                      onClick={() => openModal(index)}
                      path={mdiCloseBox}
                      size={1}
                      color="#000"
                    />
                    <Icon
                      onClick={() => openModalEdit(action)}
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
        <Title>Excluir Ação</Title>
        <Separator />
        <Container>
          {props.isSubmitting ? (
            <Loader />
          ) : (
            <>
              Tem certeza que deseja excluir a ação?
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
        <Title>Ação: </Title>
        <Separator />
        <Container>
          {props.isSubmittingEdit ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(handleEditSubmit)}>
              <Row>
                <Col>
                  <WrapperLabel>
                    <Field
                      component={RenderField}
                      type="select"
                      name="system"
                      label="Sistema"
                    >
                      <option value="0" disabled>
                        Selecione
                      </option>
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                    </Field>
                  </WrapperLabel>
                  <WrapperLabel>
                    <Field
                      component={RenderField}
                      type="select"
                      name="controller"
                      label="Controlador"
                    >
                      <option value="0" disabled>
                        Selecione
                      </option>
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                    </Field>
                  </WrapperLabel>
                  <WrapperLabel>
                    <Field
                      component={RenderField}
                      type="text"
                      name="action"
                      label="Ação"
                    />
                  </WrapperLabel>
                </Col>
                <Col>
                  <WrapperLabel>
                    <Field
                      component={RenderField}
                      type="select"
                      name="module"
                      label="Module"
                    >
                      <option value="0" disabled>
                        Selecione
                      </option>
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                    </Field>
                  </WrapperLabel>
                  <WrapperLabel>
                    <Field
                      component={RenderField}
                      type="textarea"
                      name="desc"
                      label="Descrição"
                    />
                  </WrapperLabel>
                </Col>
              </Row>
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

const loadingSelector = createLoadingSelector([FETCH_ACTION]);
const loadingSelectorDelete = createLoadingSelector([DELETE_ACTION]);
const loadingSelectorAdd = createLoadingSelector([ADD_ACTION]);

TableAction = reduxForm({
  form: 'formAddAction',
})(TableAction);

const mapStateToProps = (store) => {
  return {
    actions: store.action.actions,
    isFetching: loadingSelector(store),
    isSubmitting: loadingSelectorDelete(store),
    isSubmittingEdit: loadingSelectorAdd(store),
  };
};

TableAction = connect(mapStateToProps, {
  fetchAction,
  addAction,
  deleteAction,
})(TableAction);

Modal.setAppElement('#root');

export default TableAction;
