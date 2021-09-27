

import { API_URL } from '../config';
import {fetchClient} from '../tools'

interface IGetMessage {
  conversationId: string;
}

export const useGetMessages = () => {
  const messages = async (data: IGetMessage) => {
    return await fetchClient().get(`${API_URL}/messages?conversationId=${data?.conversationId}`);
  };
  return messages
};
