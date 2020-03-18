import produce from 'immer';

const INITIAL_STATE = {
  name: '',
  signed: false,
  loading: false,
  branch: '',
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.name = action.payload.name;
        draft.signed = true;
        draft.loading = false;
        draft.branch = action.payload.branch;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.name = '';
        draft.signed = false;
        draft.branch = '';
        break;
      }
      default:
        return state;
    }
  });
}
