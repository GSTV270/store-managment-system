export function signInRequest(email, password, branch) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password, branch },
  };
}

export function signInSuccess(name, signed, branch) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { name, signed, branch },
  };
}

export function signUpRequest(name, email, password, branch) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password, branch },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
