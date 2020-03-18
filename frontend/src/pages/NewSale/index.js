import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../services/api';

import InputMask from '../../components/InputMask';
import UnformInput from '../../components/UnformInput';
import { Container, ProductInput, ProductList } from './styles';

export default function NewSale({ history }) {
  const formRef = useRef(null);
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);

  const branch = useSelector(state => state.auth.branch);

  useEffect(() => {
    if (products.length !== 0) {
      const prices = products.map(p => p.price);

      const priceCombined = prices.reduce((totalSum, p) => {
        return totalSum + p;
      });

      setPrice(priceCombined);
    }
  }, [products]);

  async function handleSubmit(data) {
    try {
      data.products = products.map(p => p.name);

      const schema = Yup.object().shape({
        costumer: Yup.string()
          .email('Digite um e-mail válido')
          .required('O email é obrigatório'),
        products: Yup.array()
          .min(1, 'Insira pelo menos um produto')
          .required('A inserção de produto(s) é obrigatória'),
        date: Yup.string().required('A confirmação da senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.get(`/costumer/${branch}/${data.costumer}`);

      if (!response.data)
        return toast.error(
          'O cliente não foi encontrado, por favor realize seu cadastro antes de efetuar a compra'
        );

      await api.post(`/sale/${branch}`, data);

      toast.success('A venda foi registrada com sucesso');

      history.push(`/vendas`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          toast.error(error.message);
        });
      } else {
        toast.error('Houve uma falha no registro da venda');
      }
    }
  }

  async function addToBought() {
    try {
      const productToBeAdded = product.trim();

      const response = await api.get(`/product/${branch}/${productToBeAdded}`);

      setProducts(oldProducts => [...oldProducts, response.data]);
      setProduct('');
    } catch (err) {
      toast.error('O produto buscado não existe');
    }
  }

  function removeFromBought(name) {
    const newProducts = products.filter(p => p.name === name);

    setProducts(newProducts);
  }

  return (
    <Container>
      <Link to="/vendas">
        <Button variant="contained" color="primary">
          Voltar
        </Button>
      </Link>
      <h3>Registrar Nova Venda</h3>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <UnformInput name="costumer" label="Email do Cliente" />
        <ProductInput>
          <div>
            <label htmlFor="product">Produtos</label>
            <input
              id="product"
              type="text"
              value={product}
              onChange={e => setProduct(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            type="button"
            onClick={addToBought}
            size="small"
          >
            Adicionar
          </Button>
        </ProductInput>
        <ProductList>
          {products
            ? products.map(p => (
                <li key={Math.random()}>
                  <p>{p.name}</p>
                  <p>{p.price}</p>
                  <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeFromBought(p.name)}
                  />
                </li>
              ))
            : ''}
        </ProductList>
        <UnformInput
          name="price"
          label="Preço"
          type="number"
          disabled
          value={price}
        />
        <InputMask name="date" label="Data" mask="99/99/9999" />

        <Button variant="contained" type="submit">
          Criar produto
        </Button>
      </Form>
    </Container>
  );
}

NewSale.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
