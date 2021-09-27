
import { API_URL } from '../config';
import { fetchClient } from '../tools';
import { IMessages } from '../Types';

interface ICreateConversation {
  message: string;
  conversationId: string;
  receiverId: string;
}

export const useCreateMessage = () => {
  const create = async (data: ICreateConversation):Promise<IMessages| undefined> => {
    const message =  await fetchClient().post(`${API_URL}/messages/create`, data);
    const newMessage =message?.data
    if(newMessage){
      return newMessage as IMessages
    }
  };
  return create;
};
