import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';

//actions
import { fetchStatusOrder } from '../../../actions/status/order';
// styles
import { WrapperLabel, RowForm } from '../../../styles/form';
// form
import RenderField from '../../../components/Form/renderField';

let FormOrder = (props) => {
  const { handleSubmit } = props;

  const submit = (
    event,
    newValue = null,
    previousValue = null,
    name = null
  ) => {
    let dataSubmit = {};

    dataSubmit = {
      ...props.formOrder.values,
      [name]: newValue,
    };

    props.fetchStatusOrder(dataSubmit.profile, dataSubmit.status);
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
        <WrapperLabel>
          <Field
            component={RenderField}
            type="select"
            name="status"
            label="Status Pedido"
            disabled={props.status.length === 0}
            onChange={(event, newValue, previousValue, name) =>
              submit(event, newValue, previousValue, name)
            }
          >
            <option value="0">Todos</option>
            {props.status.map((value, index) => {
              return (
                <option key={index} value={value.id}>
                  {value.desc}
                </option>
              );
            })}
          </Field>
        </WrapperLabel>
      </RowForm>
    </Form>
  );
};

FormOrder = reduxForm({
  form: 'formOrder',
})(FormOrder);

const mapStateToProps = (state) => {
  const initialValues = { profile: '0' };
  return {
    formOrder: state.form.formOrder,
    status: state.order.status,
    initialValues,
  };
};

export default connect(mapStateToProps, { fetchStatusOrder })(FormOrder);
