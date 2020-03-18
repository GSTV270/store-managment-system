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

export default function Product({ match, history }) {
  const formRef = useRef(null);
  const [product, setProduct] = useState({});

  const branch = useSelector(state => state.auth.branch);

  async function handleSubmit(data) {
    try {
      await api.put(`/product/${branch}/${match.params.name}`, data);

      toast.success('O produto foi atualizado com sucesso');

      history.push(`/produto/${data.name}`);
    } catch (err) {
      toast.error('Houve uma falha na atualização do produto');
    }
  }

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(`/product/${branch}/${match.params.name}`);

      setProduct(response.data);
    }

    loadProduct();
  }, [branch, match.params.name]);

  return (
    <Container>
      <Link to="/produtos">
        <Button variant="contained" color="primary">
          Voltar
        </Button>
      </Link>
      <h3>Atualizar Produto</h3>

      <Form ref={formRef} onSubmit={handleSubmit} initialData={product}>
        <UnformInput name="name" label="Nome" />
        <UnformInput name="price" label="Preço" type="number" />

        <Button variant="contained" type="submit">
          Atualizar Produto
        </Button>
      </Form>
    </Container>
  );
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
