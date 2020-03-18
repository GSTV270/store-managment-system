import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password, branch } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password,
      branch,
    });

    const { name, signed } = response.data;

    yield put(signInSuccess(name, signed, branch));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, por favor verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');

    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export function* setLoadingFalse() {
  yield put(signFailure());
}

export default all([
  takeLatest('persist/REHYDRATE', setLoadingFalse),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
