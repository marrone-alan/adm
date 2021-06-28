import React, { useState } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiSquareEditOutline } from '@mdi/js';
import Modal from 'react-modal';
import { Field, reduxForm, SubmissionError } from 'redux-form';

// actionType
import {
  addStatusProduct,
  deleteStatusProduct,
} from '../../../actions/status/product';
import {
  FETCH_WORKFLOW_PRODUCT,
  DELETE_WORKFLOW_PRODUCT,
  ADD_PERMISSION,
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
  WrapperLabelRow,
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

let TableProduct = (props) => {
  const { handleSubmit, submitting, pristine, reset } = props;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [currentId, setCurrentId] = useState(0);

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
      props.change('statusAllowed', formValues.statusAllowed);
      props.change('statusOrder', formValues.statusOrder);
      props.change('statusItem', formValues.statusItem);
      props.change('productType', formValues.productType);
    } else {
      props.change('statusAllowed', 0);
      props.change('statusOrder', 0);
      props.change('statusItem', 0);
      props.change('productType', 'Product');
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
    props.deleteStatusProduct(currentId).then(() => {
      setIsOpen(false);
    });
  }

  const handleEditSubmit = async (values) => {
    return props.addStatusProduct(values).then(() => {
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

  if (!props.workflow) return 'Selecione um status para começar';

  if (props.workflow.length === 0) return 'Cade os dados';

  return (
    <>
      {props.workflow && (
        <Row>
          <Button type="button" onClick={() => openModalEdit(null)}>
            Adicionar Permissão
          </Button>
        </Row>
      )}
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>Status Produto</Th>
              <Th>Status Permitido</Th>
              <Th>Status Pedido</Th>
              <Th>Status Item</Th>
              <Th>Tipo Produto</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.workflow.data.map((workflow, index) => {
              return (
                <Tr key={index}>
                  <Td>{index === 0 ? props.workflow.status : ''}</Td>
                  <Td>{workflow.statusAllowed}</Td>
                  <Td>{workflow.statusOrder}</Td>
                  <Td>{workflow.statusItem}</Td>
                  <Td>{workflow.productType}</Td>
                  <Td>
                    <Icon
                      onClick={() => openModal(index)}
                      path={mdiCloseBox}
                      size={1}
                      color="#000"
                    />
                    <Icon
                      onClick={() => openModalEdit(workflow)}
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
        <Title>Excluir permissão de status</Title>
        <Separator />
        <Container>
          {props.isSubmitting ? (
            <Loader />
          ) : (
            <>
              Tem certeza que deseja excluir a permissão de status do produto
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
        <Title>Permissão: </Title>
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
                      name="statusAllowed"
                      label="Status Permitido"
                    >
                      <option value="0" disabled>
                        Selecione
                      </option>
                      <option value="Aguardando Montagem">
                        Aguardando Montagem
                      </option>
                      <option value="Montagem Finalizada">
                        Montagem Finalizada
                      </option>
                      <option value="Produto Reprovado">
                        Produto Reprovado
                      </option>
                    </Field>
                  </WrapperLabel>
                  <WrapperLabel>
                    <Field
                      component={RenderField}
                      type="select"
                      name="statusOrder"
                      label="Status Pedido"
                    >
                      <option value="0" disabled>
                        Selecione
                      </option>
                      <option value="Produção">Produção</option>
                      <option value="Entregue">Entregue</option>
                      <option value="OK">OK</option>
                    </Field>
                  </WrapperLabel>
                  <WrapperLabel>
                    <Field
                      component={RenderField}
                      type="select"
                      name="statusItem"
                      label="Status Item"
                    >
                      <option value="0" disabled>
                        Selecione
                      </option>
                      <option value="Montagem Iniciado">
                        Montagem Iniciado
                      </option>
                      <option value="Montagem Finalizado">
                        Montagem Finalizado
                      </option>
                      <option value="Produto Reprovado">
                        Produto Reprovado
                      </option>
                    </Field>
                  </WrapperLabel>
                </Col>
                <Col>
                  <Row>
                    <WrapperLabel width="100%">
                      <label>Tipo Produto</label>
                      <WrapperLabelRow>
                        <Field
                          component={RenderField}
                          type="radio"
                          name="productType"
                          id="productTypeProduct"
                          label="Produto"
                          value="Produto"
                        />
                      </WrapperLabelRow>
                      <WrapperLabelRow>
                        <Field
                          component={RenderField}
                          type="radio"
                          name="productType"
                          id="productTypeSubProduct"
                          label="Sub-produto"
                          value="Sub-produto"
                        />
                      </WrapperLabelRow>
                    </WrapperLabel>
                  </Row>
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

const loadingSelector = createLoadingSelector([FETCH_WORKFLOW_PRODUCT]);
const loadingSelectorDelete = createLoadingSelector([DELETE_WORKFLOW_PRODUCT]);
const loadingSelectorAdd = createLoadingSelector([ADD_PERMISSION]);

TableProduct = reduxForm({
  form: 'formAddPermission',
})(TableProduct);

const mapStateToProps = (store) => {
  return {
    workflow: store.product.workflow,
    isFetching: loadingSelector(store),
    isSubmitting: loadingSelectorDelete(store),
    isSubmittingEdit: loadingSelectorAdd(store),
  };
};

TableProduct = connect(mapStateToProps, {
  addStatusProduct,
  deleteStatusProduct,
})(TableProduct);

Modal.setAppElement('#root');

export default TableProduct;
