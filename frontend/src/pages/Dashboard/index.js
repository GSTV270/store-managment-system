import React, { useState, useEffect } from 'react';
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

import {
  Container,
  Charts,
  MaterialTable,
  ActionCell,
  ContTable,
} from './styles';
import DataCharts from '../../components/DataCharts';

export default function Dashboard() {
  const [salesMonth, setSalesMonth] = useState([]);
  const [profitMonth, setProfitMonth] = useState([]);
  const [salesOfTheDay, setsalesOfTheDay] = useState([]);

  const branch = useSelector(state => state.auth.branch);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/dashboard/${branch}`);

      setSalesMonth(response.data.salesByDay);
      setProfitMonth(response.data.profitByDay);
      setsalesOfTheDay(response.data.salesOfTheDay);
    }

    loadData();
  }, [branch]);

  return (
    <Container>
      <Charts>
        {salesMonth.length > 0 && profitMonth.length > 0 ? (
          <>
            <DataCharts
              data={salesMonth}
              name="Gráfico de Vendas por dia"
              dataKey="sales"
            />
            <DataCharts
              data={profitMonth}
              name="Gráfico de Lucro por dia"
              dataKey="profit"
            />
          </>
        ) : (
          ''
        )}
      </Charts>
      <h2>VENDAS DO DIA</h2>
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
            {salesOfTheDay.map(sale => (
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
