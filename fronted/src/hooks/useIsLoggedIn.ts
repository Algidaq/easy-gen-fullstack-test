import { jwtDecode } from 'jwt-decode';

export const useIsLoggedIn = (): boolean => {
  const token = localStorage.getItem('authorization');
  if (!token) return false;
  try {
    const _decoded = jwtDecode(token);
    return true;
  } catch (e) {
    return false;
  }
};
