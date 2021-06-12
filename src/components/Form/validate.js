/**
 * Valida os Fields do Redux Form
 * attr validate
 * @param {*} value
 */

/**
 * Veriifica se o campo contém somente números
 * @param {*} value
 */
export const number = (value) =>
  value && isNaN(Number(value)) ? 'Precisa ser um número' : undefined;

/**
 * Verifica se o Campo esta preenchido
 * @param {*} value
 */
export const required = (value) => (!value ? 'Campo Obrigatório' : undefined);

/**
 * Verifica se o email é válido
 * @param {*} value
 */
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Endereço de email inválido'
    : undefined;

/**
 * Verifica se o cnpj é válido
 * @param {*} value
 */
export const cnpj = (value) =>
  value && !/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/i.test(value)
    ? 'CNPJ Inválido'
    : undefined;
/**
 * Verifica se o cpf é válido
 * @param {*} value
 */
export const cpf = (value) =>
  value && !validateCpf(value) ? 'CPF Inválido' : undefined;

/**
 * Verifica se a data é válida
 * @param {*} value
 */
export const date = (value) =>
  value &&
  !/^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/i.test(
    value
  )
    ? 'Data Inválida'
    : undefined;

/**
 * Verifica o tamanho do value Date
 * @param {*} value
 */
export const lengthDate = (value) => {
  if (value !== undefined) {
    value = value.replace(/[^\d]+/g, '');
    const arrValue = value.split('');
    return arrValue.length === 8;
  }
};

/**
 * Verifica o tamanho do value Phone
 * @param {*} value
 */
export const lengthPhone = (value) => {
  if (value === '') {
    return undefined;
  }
  if (value !== undefined) {
    value = value.replace(/[^\d]+/g, '');
    const arrValue = value.split('');
    return arrValue.length < 10 ? 'Telefone Inválido' : undefined;
  }
};

/**
 * Função que valida o CPF
 * @param {*} value
 */
export const validateCpf = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf === '') return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999' ||
    cpf === '12345678909'
  )
    return false;
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};
