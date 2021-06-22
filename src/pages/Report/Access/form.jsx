import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

//actions
import { fetchAccessTable } from '../../../actions/report/access';
// styles
import { WrapperLabel, Button, RowForm } from '../../../styles/form';
// form
import RenderField from '../../../components/Form/renderField';
// storage
import { getErrors, clearErrors } from '../../../services/storage';

let FormAccess = (props) => {
  const { handleSubmit, submitting } = props;

  const submit = async (values) => {
    return props.fetchAccessTable(values).then(() => {
      const formError = getErrors();
      if (formError !== null) {
        clearErrors();
        throw new SubmissionError(formError);
      }
    });
  };

  const isFilledDated = () => {
    if (!props.formAccess) return true;
    if (!props.formAccess.values) return true;

    const { initial_date, final_date } = props.formAccess.values;
    return !initial_date || !final_date;
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <RowForm>
        <WrapperLabel>
          <Field
            component={RenderField}
            type="text"
            name="user"
            placeholder="Usuário"
            label="Usuário"
          />
        </WrapperLabel>
        <WrapperLabel>
          <Field
            component={RenderField}
            type="select"
            name="profile"
            label="Perfil"
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
            type="date"
            name="initial_date"
            placeholder="Data Inicial"
            label="Data Inicial"
          />
        </WrapperLabel>
        <WrapperLabel>
          <Field
            component={RenderField}
            type="date"
            name="final_date"
            placeholder="Data Final"
            label="Data Final"
          />
        </WrapperLabel>
      </RowForm>
      <Button type="submit" disabled={submitting || isFilledDated()}>
        Gerar
      </Button>
    </Form>
  );
};

const mapStateToProps = (store) => {
  return {
    formAccess: store.form.formAccess,
  };
};

FormAccess = reduxForm({
  form: 'formAccess',
})(FormAccess);

export default connect(mapStateToProps, { fetchAccessTable })(FormAccess);
