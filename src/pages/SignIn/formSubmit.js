import { SubmissionError } from 'redux-form';
import { toast } from 'react-toastify';

import { login } from '../../services/auth';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function submit(values) {
  return sleep(1000) // simulate server latency
    .then(() => {
      let response = {};

      if (!['john', 'paul', 'george', 'ringo'].includes(values.user)) {
        response = { ...response, user: 'Este usuário não existe!' };
      }

      if (values.pass !== '1') {
        response = { ...response, pass: 'Senha incorreta!' };
      }

      if (
        Object.keys(response).length === 0 &&
        response.constructor === Object
      ) {
        const result = login('token');
        if (result) {
          toast.success('Usuário logado!');
        } else {
          toast.error('Não foi possível realizar o login!');
          throw new SubmissionError({
            _error: 'Não foi possível realizar o login!',
          });
        }
      } else {
        throw new SubmissionError(response);
      }
    });
}

export default submit;
