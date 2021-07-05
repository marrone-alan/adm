import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

//actions
import {
  savePersonalData,
  fetchPersonalData,
} from '../../../actions/profile/personalData';
// styles
import { WrapperLabel, Button } from '../../../styles/form';
import { Row, Col, Container } from '../../../styles/align';
import { SubTitle } from '../../../styles/title';
// form
import RenderField from '../../../components/Form/renderField';
// storage
import { getErrors, clearErrors } from '../../../services/storage';
// components
import Loader from '../../../components/Loader';

let FormPersonalData = (props) => {
  const { handleSubmit, submitting, pristine } = props;

  useEffect(() => {
    props.fetchPersonalData();
    // eslint-disable-next-line
  }, []);

  const submit = async (values) => {
    return props.savePersonalData(values).then(() => {
      const formError = getErrors();
      if (formError !== null) {
        clearErrors();
        throw new SubmissionError(formError);
      }
    });
  };

  if (!props.personalData) return <Loader />;

  return (
    <Container>
      <Form onSubmit={handleSubmit(submit)}>
        <Col>
          <Row>
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
                name="login"
                placeholder="Login"
                label="Login"
                disabled={true}
              />
            </WrapperLabel>
          </Row>
          <Row>
            <WrapperLabel>
              <Field
                component={RenderField}
                type="date"
                name="dta_nasc"
                placeholder="Data Nascimento"
                label="Data Nascimento"
              />
            </WrapperLabel>
            <WrapperLabel>
              <Field
                component={RenderField}
                type="text"
                name="facebook"
                placeholder="Facebook"
                label="Facebook"
              />
            </WrapperLabel>
          </Row>
          <SubTitle>Informações para Emergências</SubTitle>
          <Row>
            <WrapperLabel>
              <Field
                component={RenderField}
                type="text"
                name="cellphone"
                placeholder="Celular"
                label="Celular"
              />
            </WrapperLabel>
            <WrapperLabel>
              <Field
                component={RenderField}
                type="text"
                name="phone"
                placeholder="Telefone"
                label="Telefone"
              />
            </WrapperLabel>
          </Row>
        </Col>
        <Col>
          <Row>
            <WrapperLabel>
              <Field
                component={RenderField}
                type="text"
                name="contact"
                placeholder="Contato"
                label="Contato"
              />
            </WrapperLabel>
            <WrapperLabel>
              <Field
                component={RenderField}
                type="text"
                name="contact_phone"
                placeholder="Telefone"
                label="Telefone do Contato"
              />
            </WrapperLabel>
          </Row>
          <Row>
            <WrapperLabel>
              <Field
                component={RenderField}
                type="select"
                name="blood_type"
                label="Tipo Sanguíneo"
              >
                <option value="0">Todos</option>
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
                label="Alergias e outras observações: *"
              />
            </WrapperLabel>
          </Row>
        </Col>

        <Button type="submit" disabled={submitting || pristine}>
          Salvar
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = (store) => {
  return {
    formReportAccess: store.form.formReportAccess,
    initialValues: store.personalData.data,
    personalData: store.personalData.data,
  };
};

FormPersonalData = reduxForm({
  form: 'formPersonalData',
})(FormPersonalData);

export default connect(mapStateToProps, {
  savePersonalData,
  fetchPersonalData,
})(FormPersonalData);
