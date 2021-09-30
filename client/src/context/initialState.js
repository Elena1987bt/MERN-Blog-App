export const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: false,
};
