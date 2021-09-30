export const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, user: payload, loading: false };
    case 'ERROR':
      return { ...state, error: true, loading: false };
    case 'LOG_OUT':
      return { ...state, user: payload, loading: false, error: false };
    case 'UPDATE_SUCCESS':
      return { ...state, user: payload, loading: false, error: false };
    case 'DELETE_SUCCESS':
      return { ...state, user: payload, loading: false, error: false };
    default:
      return state;
  }
};
