import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm, SubmissionError } from 'redux-form';

//actions
import { fetchUsers } from '../../actions/users';
// styles
import {
  WrapperLabel,
  RowForm,
  Button,
  WrapperButton,
} from '../../styles/form';
// form
import RenderField from '../../components/Form/renderField';
// storage
import { getErrors, clearErrors } from '../../services/storage';

let FormUsers = (props) => {
  const { handleSubmit, submitting, pristine } = props;

  const submit = async (values) => {
    return props.fetchUsers(values).then(() => {
      const formError = getErrors();
      if (formError !== null) {
        clearErrors();
        throw new SubmissionError(formError);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <RowForm>
        <WrapperLabel>
          <Field
            component={RenderField}
            type="text"
            name="login"
            label="Login"
          />
        </WrapperLabel>
        <WrapperLabel>
          <Field
            component={RenderField}
            type="select"
            name="profile"
            label="Perfil"
          >
            <option value="0" disabled>
              Todos
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
            name="system"
            label="Sistema"
          >
            <option value="0" disabled>
              Todos
            </option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
          </Field>
        </WrapperLabel>
        <WrapperButton>
          <Button type="submit" disabled={submitting || pristine}>
            Buscar
          </Button>
        </WrapperButton>
      </RowForm>
    </Form>
  );
};

FormUsers = reduxForm({
  form: 'formUsers',
})(FormUsers);

const mapStateToProps = () => {
  const initialValues = { profile: '0', system: '0' };
  return {
    initialValues,
  };
};

export default connect(mapStateToProps, { fetchUsers })(FormUsers);
