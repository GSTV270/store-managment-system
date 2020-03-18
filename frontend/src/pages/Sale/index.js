import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { Container, Info } from './styles';

export default function Sale({ match }) {
  const [sale, setSale] = useState({});

  const branch = useSelector(state => state.auth.branch);

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(`/sale/${branch}/${match.params.id}`);

      setSale(response.data);
    }

    loadProduct();
  }, [branch, match.params.id]);

  return (
    <Container>
      <Link to="/vendas">
        <Button variant="contained" color="primary">
          Voltar
        </Button>
      </Link>
      <h3>Vizualização de venda</h3>

      {sale.products ? (
        <Info>
          <div>
            <strong>COMPRADOR</strong>
            <p>{sale.costumer}</p>
          </div>
          <div>
            <strong>PRODUTOS</strong>
            <p>{sale.products.join(', ')}</p>
          </div>
          <div>
            <strong>VALOR TOTAL</strong>
            <p>{formatPrice(sale.price)}</p>
          </div>
          <div>
            <strong>DATA</strong>
            <p>{sale.date}</p>
          </div>
        </Info>
      ) : (
        'loading'
      )}
    </Container>
  );
}

Sale.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
