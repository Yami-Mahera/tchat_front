import { API_URL } from '../config';
import { fetchClient } from '../tools';
import { IConversation } from '../Types';


export const useCloseConversation = () => {
  const closeConversation = async (conversationId: string) :Promise<IConversation| undefined>=> {
    const res = await fetchClient().get(
      `${API_URL}/conversations/close?conversationId=${conversationId}`,
    );
    const newConv = res?.data ;
    if (newConv) return newConv;
  };
  return closeConversation;
};
