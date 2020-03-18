import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Form } from '@unform/web';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import api from '../../services/api';

import UnformInput from '../../components/UnformInput';
import { Container } from './styles';

export default function Costumer({ match, history }) {
  const formRef = useRef(null);
  const [costumer, setCostumer] = useState({});

  const branch = useSelector(state => state.auth.branch);

  async function handleSubmit(data) {
    try {
      await api.put(`/costumer/${branch}/${match.params.email}`, data);

      toast.success('O cliente foi atualizado com sucesso');

      history.push(`/cliente/${data.email}`);
    } catch (err) {
      toast.error('Houve uma falha na atualização do cliente');
    }
  }

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(
        `/costumer/${branch}/${match.params.email}`
      );

      setCostumer(response.data);
    }

    loadProduct();
  }, [branch, match.params.email]);

  return (
    <Container>
      <Link to="/clientes">
        <Button variant="contained" color="primary">
          Voltar
        </Button>
      </Link>
      <h3>Atualizar Cliente</h3>

      <Form ref={formRef} onSubmit={handleSubmit} initialData={costumer}>
        <UnformInput name="name" label="Nome" />
        <UnformInput name="email" label="Email" type="email" />
        <UnformInput name="age" label="Idade" type="number" />
        <UnformInput name="address" label="Endereço" />

        <Button variant="contained" type="submit">
          Atualizar Cliente
        </Button>
      </Form>
    </Container>
  );
}

Costumer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
