import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import Button from '@material-ui/core/Button';
import api from '../../services/api';

import UnformInput from '../../components/UnformInput';
import { Container } from './styles';

export default function NewCostumer({ history }) {
  const formRef = useRef(null);

  const branch = useSelector(state => state.auth.branch);

  async function handleSubmit(data) {
    try {
      await api.post(`/costumer/${branch}`, data);

      toast.success('O produto foi criado com sucesso');

      history.push(`/clientes`);
    } catch (err) {
      toast.error('Houve uma falha na criação do produto');
    }
  }

  return (
    <Container>
      <Link to="/clientes">
        <Button variant="contained" color="primary">
          Voltar
        </Button>
      </Link>
      <h3>Cadastrar cliente</h3>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <UnformInput name="name" label="Nome" />
        <UnformInput name="email" label="Email" type="email" />
        <UnformInput name="age" label="Idade" type="number" />
        <UnformInput name="address" label="Endereço" />

        <Button variant="contained" type="submit">
          Cadastrar cliente
        </Button>
      </Form>
    </Container>
  );
}

NewCostumer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
