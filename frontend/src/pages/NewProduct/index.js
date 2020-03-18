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

export default function NewProduct({ history }) {
  const formRef = useRef(null);

  const branch = useSelector(state => state.auth.branch);

  async function handleSubmit(data) {
    try {
      await api.post(`/product/${branch}`, data);

      toast.success('O produto foi criado com sucesso');

      history.push(`/produtos`);
    } catch (err) {
      toast.error('Houve uma falha na criação do produto');
    }
  }

  return (
    <Container>
      <Link to="/produtos">
        <Button variant="contained" color="primary">
          Voltar
        </Button>
      </Link>
      <h3>Criar produto</h3>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <UnformInput name="name" label="Nome" />
        <UnformInput name="price" label="Preço" type="number" />

        <Button variant="contained" type="submit">
          Criar produto
        </Button>
      </Form>
    </Container>
  );
}

NewProduct.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
