import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

// styles
import { Form } from './style';
import { Logo } from '../../styles/title';
import { Button, LabelessInput } from '../../styles/form';
// form
import RenderField from '../../components/Form/renderField';
import { required } from '../../components/Form/validate';
// submit
import submit from './formSubmit';
// components
import Loader from '../../components/Loader';
// config
import { urlRedirect } from '../../config';

const handleSubmitSuccess = (props) => {
  props.history.push(urlRedirect);
};

let SignInForm = (props) => {
  const { handleSubmit, submitting, pristine } = props;

  if (submitting) {
    return <Loader />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Logo>Adm</Logo>
      <LabelessInput>
        <Field
          component={RenderField}
          validate={required}
          type="text"
          name="user"
          id="user"
          placeholder="Usuário"
        />
      </LabelessInput>
      <LabelessInput>
        <Field
          component={RenderField}
          validate={required}
          type="password"
          name="pass"
          id="pass"
          placeholder="Senha"
        />
      </LabelessInput>
      <Button type="submit" disabled={submitting || pristine}>
        Entrar
      </Button>
    </Form>
  );
};

SignInForm = reduxForm({
  form: 'signin',
  onSubmit: submit,
  onSubmitSuccess: (result, dispath, props) => {
    handleSubmitSuccess(props);
  },
})(SignInForm);

export default withRouter(SignInForm);
