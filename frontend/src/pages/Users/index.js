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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState({});

  const branch = useSelector(state => state.auth.branch);

  const loadProducts = useCallback(async () => {
    const response = await api.get(`/users/${branch}`);

    setUsers(response.data);
  }, [branch]);

  function toggleDeleteDialog(product) {
    if (!open) setToBeDeleted(product);
    else setToBeDeleted({});

    setOpen(!open);
  }

  async function handleDeletetion() {
    setOpen(false);
    await api.delete(`/user/${branch}/${toBeDeleted.email}`);

    setToBeDeleted({});
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, [branch, loadProducts]);

  return (
    <Container>
      <Link to="/cadastro/usuario">
        <Button variant="contained" color="primary">
          Cadastrar novo usuário
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
              <TableCell align="center">
                <strong>AÇÕES</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.email}>
                <TableCell align="left">{user.name}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell style={{ width: 230 }} align="center">
                  <ActionCell>
                    <Link to={`/usuario/${user.email}`}>
                      <Button variant="contained">Editar</Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => toggleDeleteDialog(user)}
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
