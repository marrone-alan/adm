import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm, SubmissionError } from 'redux-form';

//actions
import { fetchAction } from '../../../actions/resource/action';
// styles
import {
  WrapperLabel,
  RowForm,
  Button,
  WrapperButton,
} from '../../../styles/form';
// form
import RenderField from '../../../components/Form/renderField';
// storage
import { getErrors, clearErrors } from '../../../services/storage';

let FormAction = (props) => {
  const { handleSubmit, submitting, pristine } = props;

  const submit = async (values) => {
    return props.fetchAction(values).then(() => {
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
        <WrapperLabel>
          <Field
            component={RenderField}
            type="select"
            name="module"
            label="Modulo"
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
            name="controller"
            label="Controlador"
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
            type="text"
            name="action"
            label="Ação"
          />
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

FormAction = reduxForm({
  form: 'formAction',
})(FormAction);

const mapStateToProps = () => {
  const initialValues = { controller: '0', system: '0', module: '0' };
  return {
    initialValues,
  };
};

export default connect(mapStateToProps, { fetchAction })(FormAction);
