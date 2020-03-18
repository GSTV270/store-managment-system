import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

import { Container, MaterialTable, ActionCell } from './styles';

export default function Sales() {
  const [sales, setSales] = useState([]);

  const branch = useSelector(state => state.auth.branch);

  const loadProducts = useCallback(async () => {
    const response = await api.get(`/sales/${branch}`);

    setSales(response.data);
  }, [branch]);

  useEffect(() => {
    loadProducts();
  }, [branch, loadProducts]);

  return (
    <Container>
      <Link to="/cadastro/venda">
        <Button variant="contained" color="primary">
          Registrar nova venda
        </Button>
      </Link>
      <MaterialTable component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <strong>CLIENTE</strong>
              </TableCell>
              <TableCell align="left">
                <strong>PRODUTOS</strong>
              </TableCell>
              <TableCell align="left">
                <strong>VALOR TOTAL</strong>
              </TableCell>
              <TableCell align="center">
                <strong>AÇÕES</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map(sale => (
              <TableRow key={sale.id}>
                <TableCell align="left">{sale.costumer}</TableCell>
                <TableCell align="left">{sale.products.join(', ')}</TableCell>
                <TableCell align="left">{formatPrice(sale.price)}</TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  <ActionCell>
                    <Link to={`/venda/${sale.id}`}>
                      <Button variant="contained">Visualizar</Button>
                    </Link>
                  </ActionCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MaterialTable>
    </Container>
  );
}
