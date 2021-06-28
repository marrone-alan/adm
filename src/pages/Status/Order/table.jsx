import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';

// actionType
import {
  FETCH_STATUS_ORDER,
  CHANGE_STATUS_ORDER,
} from '../../../actions/actionTypes';
import { changeStatusOrder } from '../../../actions/status/order';
// components
import Loader from '../../../components/Loader';
// form
import RenderField from '../../../components/Form/renderField';
// style
import { TableWrapper, Table, Tbody, Tr, Td } from '../../../styles/table';
import { Button, WrapperCheckbox } from '../../../styles/form';

// services
import { createLoadingSelector } from '../../../services/selectors';

let TableOrder = (props) => {
  const { handleSubmit, pristine, submitting } = props;

  if (props.isFetching) {
    return <Loader />;
  }

  if (!props.workflow) return 'Selecione um perfil para começar';

  if (props.workflow.length === 0) return 'Cade os dados';

  const submit = async (values) => {
    return props.changeStatusOrder({
      status_pedido: values,
      ...props.formOrder.values,
    });
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <TableWrapper>
        <Table>
          <Tbody>
            {props.workflow.map((status) => {
              return (
                <>
                  {status.workflow.map((statusTo, index) => {
                    return (
                      <Tr key={index}>
                        {index === 0 && (
                          <Td rowSpan={status.workflow.length}>
                            {status.desc}
                          </Td>
                        )}
                        <Td>
                          <WrapperCheckbox>
                            <Field
                              key={index}
                              component={RenderField}
                              type="checkbox"
                              id={`status_pedido[${status.id}][${statusTo.id}]`}
                              name={`status_pedido[${status.id}][${statusTo.id}]`}
                              label={statusTo.desc}
                            />
                          </WrapperCheckbox>
                        </Td>
                      </Tr>
                    );
                  })}
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableWrapper>
      <Button type="submit" disabled={submitting || pristine}>
        Salvar
      </Button>
    </Form>
  );
};

const loadingSelector = createLoadingSelector([
  FETCH_STATUS_ORDER,
  CHANGE_STATUS_ORDER,
]);

const mapStateToProps = (store) => {
  return {
    initialValues: store.order.initialValues,
    workflow: store.order.workflow,
    isFetching: loadingSelector(store),
    formOrder: store.form.formOrder,
  };
};

TableOrder = reduxForm({
  form: 'formTableOrder',
})(TableOrder);

TableOrder = connect(mapStateToProps, { changeStatusOrder })(TableOrder);

export default TableOrder;
