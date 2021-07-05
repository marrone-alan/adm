import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, Form } from 'redux-form';

//actions
import { fetchReportAccessTable } from '../../../actions/profile/reportAccess';
// styles
import { WrapperLabel, Button, RowForm } from '../../../styles/form';
// form
import RenderField from '../../../components/Form/renderField';
// storage
import { getErrors, clearErrors } from '../../../services/storage';

let FormReportAccess = (props) => {
  const { handleSubmit, submitting } = props;

  const submit = async (values) => {
    return props.fetchReportAccessTable(values).then(() => {
      const formError = getErrors();
      if (formError !== null) {
        clearErrors();
        throw new SubmissionError(formError);
      }
    });
  };

  const isFilledDated = () => {
    if (!props.formReportAccess) return true;
    if (!props.formReportAccess.values) return true;

    const { initial_date, final_date } = props.formReportAccess.values;
    return !initial_date || !final_date;
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <RowForm>
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
    formReportAccess: store.form.formReportAccess,
  };
};

FormReportAccess = reduxForm({
  form: 'formReportAccess',
})(FormReportAccess);

export default connect(mapStateToProps, {
  fetchReportAccessTable,
})(FormReportAccess);
