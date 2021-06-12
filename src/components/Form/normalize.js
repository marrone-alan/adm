// recebe uma string e retorna somente números
export const onlyNumbers = (value) => value && value.replace(/[^\d]+/g, '');
