import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import Button from '@material-ui/core/Button';
import api from '../../services/api';

import UnformInput from '../../components/UnformInput';
import { Container } from './styles';

export default function NewUser({ history }) {
  const formRef = useRef(null);

  const branch = useSelector(state => state.auth.branch);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O email é obrigatório'),
        newPassword: Yup.string()
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
          .required('A senha é obrigatória'),
        passwordConfirmation: Yup.string()
          .required('A confirmação da senha é obrigatória')
          .oneOf(
            [Yup.ref('newPassword')],
            'A confirmação da senha deve ser exatamente igual a senha'
          ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      data.password = data.newPassword;

      await api.post(`/user/${branch}`, data);

      toast.success('O usuário foi criado com sucesso');

      history.push(`/usuarios`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          toast.error(error.message);
        });
      } else {
        toast.error('Houve uma falha no cadastro do usuário');
      }
    }
  }

  return (
    <Container>
      <Link to="/usuarios">
        <Button variant="contained" color="primary">
          Voltar
        </Button>
      </Link>
      <h3>Cadastrar usuários</h3>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <UnformInput name="name" label="Nome" />
        <UnformInput name="email" label="Email" type="email" />
        <UnformInput name="newPassword" label="Senha" type="password" />
        <UnformInput
          name="passwordConfirmation"
          label="Confirmção da senha"
          type="password"
        />

        <Button variant="contained" type="submit">
          Cadastrar usuário
        </Button>
      </Form>
    </Container>
  );
}

NewUser.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
