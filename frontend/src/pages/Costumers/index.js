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

import api from '../../services/api';

import DeleteConfirmation from '../../components/DeleteConfirmation';
import { Container, MaterialTable, ActionCell } from './styles';

export default function Costumers() {
  const [costumers, setCostumers] = useState([]);
  const [open, setOpen] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState({});

  const branch = useSelector(state => state.auth.branch);

  const loadProducts = useCallback(async () => {
    const response = await api.get(`/costumers/${branch}`);

    setCostumers(response.data);
  }, [branch]);

  function toggleDeleteDialog(product) {
    if (!open) setToBeDeleted(product);
    else setToBeDeleted({});

    setOpen(!open);
  }

  async function handleDeletetion() {
    setOpen(false);
    await api.delete(`/costumer/${branch}/${toBeDeleted.email}`);

    setToBeDeleted({});
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, [branch, loadProducts]);

  return (
    <Container>
      <Link to="/cadastro/cliente">
        <Button variant="contained" color="primary">
          Cadastrar novo cliente
        </Button>
      </Link>
      <MaterialTable component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <strong>NOME</strong>
              </TableCell>
              <TableCell align="left">
                <strong>EMAIL</strong>
              </TableCell>
              <TableCell align="left">
                <strong>AGE</strong>
              </TableCell>
              <TableCell align="left">
                <strong>ADDRESS</strong>
              </TableCell>
              <TableCell align="center">
                <strong>AÇÕES</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {costumers.map(costumer => (
              <TableRow key={costumer.email}>
                <TableCell align="left">{costumer.name}</TableCell>
                <TableCell align="left">{costumer.email}</TableCell>
                <TableCell align="left">{costumer.age}</TableCell>
                <TableCell align="left">{costumer.address}</TableCell>
                <TableCell style={{ width: 230 }} align="center">
                  <ActionCell>
                    <Link to={`/cliente/${costumer.email}`}>
                      <Button variant="contained">Editar</Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => toggleDeleteDialog(costumer)}
                    >
                      Excluir
                    </Button>
                  </ActionCell>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MaterialTable>
      <DeleteConfirmation
        open={open}
        toggleDeleteDialog={toggleDeleteDialog}
        onDeletion={handleDeletetion}
        itemType="cliente"
        item={toBeDeleted}
      />
    </Container>
  );
}
