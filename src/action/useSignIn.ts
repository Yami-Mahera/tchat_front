import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { API_URL } from '../config';

interface ILogin {
  email: string;
  password: string;
}
export const useSignIn = () => {
  const history = useHistory();
  const create = async (data: ILogin) => {
    const dataUser = await axios.post(`${API_URL}/auth/login`, data);
    if (dataUser?.data) {
      localStorage.setItem('user_id', dataUser?.data?._id);
      history.push('/');
    }
  };
  return create;
};
