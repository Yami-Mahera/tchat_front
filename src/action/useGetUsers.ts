
import { API_URL } from '../config';
import { fetchClient } from '../tools';

export const useGetUsers = () => {
  const getUser = async () => {
    return await fetchClient().get(`${API_URL}/user/list`);
  };

  return getUser;
};
