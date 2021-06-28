import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';

//actions
import { fetchWorkflowProduct } from '../../../actions/status/product';
// styles
import { WrapperLabel, RowForm } from '../../../styles/form';
// form
import RenderField from '../../../components/Form/renderField';

let FormProduct = (props) => {
  const { handleSubmit } = props;

  const submit = (
    event,
    newValue = null,
    previousValue = null,
    name = null
  ) => {
    let dataSubmit = {};

    dataSubmit = {
      ...props.formProduct.values,
      [name]: newValue,
    };

    props.fetchWorkflowProduct(dataSubmit.status);
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <RowForm>
        <WrapperLabel>
          <Field
            component={RenderField}
            type="select"
            name="profile"
            label="Perfil"
            onChange={(event, newValue, previousValue, name) =>
              submit(event, newValue, previousValue, name)
            }
          >
            <option value="0" disabled>
              Selecione
            </option>
            <option value="1">Desenvolvedor</option>
            <option value="2">Admin</option>
            <option value="3">Usuário</option>
          </Field>
        </WrapperLabel>
      </RowForm>
    </Form>
  );
};

FormProduct = reduxForm({
  form: 'formProduct',
})(FormProduct);

const mapStateToProps = (state) => {
  const initialValues = { profile: '0' };
  return {
    formProduct: state.form.formProduct,
    workflow: state.product.workflow,
    initialValues,
  };
};

export default connect(mapStateToProps, { fetchWorkflowProduct })(FormProduct);
