export const getToken = (): string | null => {
  const auth = localStorage.getItem('user_id');
  return auth;
};
