import React, { useState } from 'react';
import Modal from 'react-modal';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

// actions
import { addIPAddress, fetchIPAddressTable } from '../../actions/ipAddress';
import { ADD_IP_ADDRESS } from '../../actions/actionTypes';
// form
import RenderField from '../../components/Form/renderField';
import { required } from '../../components/Form/validate';
// components
import Loader from '../../components/Loader';
// styles
import { Button, Form, WrapperLabel, WrapperButton } from '../../styles/form';
import { Title } from '../../styles/title';
import { Container, Separator } from '../../styles/align';
import { modalStyle } from '../../styles/variables';
// storage
import { getErrors, clearErrors } from '../../services/storage';
import { createLoadingSelector } from '../../services/selectors';

let ModalNewIPAddress = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { handleSubmit, submitting, pristine } = props;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const submit = async (values) => {
    return props.addIPAddress(values).then(() => {
      const formError = getErrors();
      if (formError !== null) {
        clearErrors();
        localStorage.removeItem('formError');
        throw new SubmissionError(formError);
      } else {
        props.reset();
        setIsOpen(false);
        props.fetchIPAddressTable(1);
      }
    });
  };

  return (
    <div>
      <Button onClick={openModal}>Adicionar Novo</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <Title>Liberação de IP</Title>
        <Separator />
        <Container>
          {props.isSubmitting ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit(submit)}>
              <WrapperLabel width="100%">
                <Field
                  component={RenderField}
                  validate={required}
                  type="text"
                  name="ip"
                  placeholder="Endereço do IP"
                  label="IP: *"
                />
              </WrapperLabel>
              <WrapperLabel width="100%">
                <Field
                  component={RenderField}
                  validate={required}
                  type="textarea"
                  name="desc"
                  label="Descrição: *"
                />
              </WrapperLabel>
              <WrapperButton>
                <Button type="button" onClick={closeModal}>
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
    </div>
  );
};

const loadingSelectorModal = createLoadingSelector([ADD_IP_ADDRESS]);

ModalNewIPAddress = reduxForm({
  form: 'newIpAddress',
})(ModalNewIPAddress);

const mapStateToProps = (store) => ({
  newIPAddress: store.ipAddress.dataNewIP,
  isSubmitting: loadingSelectorModal(store),
});

Modal.setAppElement('#root');

export default connect(mapStateToProps, { addIPAddress, fetchIPAddressTable })(
  ModalNewIPAddress
);
