import React from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import brasil from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', brasil);

const renderError = ({ touched, error }) => {
  return touched && error && <strong>{error}</strong>;
};

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta,
  children,
  disabled,
  id,
}) => {
  switch (type) {
    case 'radio':
      return (
        <span>
          {label && <label htmlFor={id}>{label}</label>}
          <input checked="checked" id={id} {...input} type={type} />
          {renderError(meta)}
        </span>
      );
    case 'checkbox':
      return (
        <>
          {label && <label htmlFor={id}>{label}</label>}
          <input checked="checked" id={id} {...input} type={type} />
          {renderError(meta)}
        </>
      );
    case 'select':
      return (
        <>
          {label && <label>{label}</label>}
          <div>
            <select disabled={disabled} {...input}>
              {children}
            </select>
            {renderError(meta)}
          </div>
        </>
      );
    case 'textarea':
      return (
        <>
          {label && <label>{label}</label>}
          <div>
            <textarea rows="5" {...input} />
            {renderError(meta)}
          </div>
        </>
      );
    case 'date':
      let value = input.value;
      if (!(input.value instanceof Date) && input.value !== '') {
        value = new Date(input.value);
        if (Object.prototype.toString.call(value) === '[object Date]') {
          if (isNaN(value.getTime())) {
            value = null;
          }
        } else {
          value = null;
        }
      }

      return (
        <>
          {label && <label>{label}</label>}
          <DatePicker
            {...input}
            autoComplete="off"
            dateFormat="dd/MM/yyyy"
            selected={value ? value : null}
            placeholderText="Selecione a data"
            locale={brasil}
          />
          {renderError(meta)}
        </>
      );
    default:
      return (
        <>
          {label && <label>{label}</label>}
          <div>
            <input
              {...input}
              disabled={disabled}
              placeholder={placeholder}
              type={type}
            />
            {renderError(meta)}
          </div>
        </>
      );
  }
};

export default renderField;
