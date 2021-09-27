
import { API_URL } from '../config';
import { fetchClient } from '../tools';

export const UseGetConversations = () => {
  const conversations = async () => {
    return await fetchClient().get(`${API_URL}/conversations/list`);
  };
  return conversations;
};
