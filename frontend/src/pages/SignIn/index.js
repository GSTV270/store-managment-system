import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import api from '../../services/api';

import * as AuthActions from '../../store/modules/auth/actions';

import SelectInput from '../../components/SelectInput';
import LoadingSpin from '../../components/LoadingSpin';
import { Container } from './styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState(0);
  const [branches, setBranches] = useState([]);

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadBranches() {
      const response = await api.get('/branches');

      const formattedBranches = [];

      for (let i = 0; i < response.data; i += 1) {
        formattedBranches.push({
          value: i,
          label: `Unidade ${i + 1}`,
        });
      }

      setBranches(formattedBranches);
    }

    loadBranches();
  }, []);

  useEffect(() => {
    console.log(branch);
  }, [branch]);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(AuthActions.signInRequest(email, password, branch));
  }

  return (
    <Container>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <LocalGroceryStoreIcon fontSize="large" htmlColor="#fff" />
        </div>
        <SelectInput
          label="Filiais"
          value={branch}
          handleChange={e => setBranch(e.target.value)}
          items={branches}
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">
          {loading ? <LoadingSpin size={20} /> : 'Acessar'}
        </button>
      </form>
    </Container>
  );
}
