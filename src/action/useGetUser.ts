
import { API_URL } from '../config';
import { fetchClient } from '../tools';

export const useGetUser = () => {
  const getUser = async () => {
    return await fetchClient().get(`${API_URL}/user/`);
  };

  return getUser;
};
