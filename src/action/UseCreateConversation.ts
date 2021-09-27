import { API_URL } from '../config';
import { fetchClient } from '../tools';
import { IConversation } from '../Types';

interface ICreateConversation {
  memberId: string;
}

export const UseCreateConversation = () => {
  const create = async (data: ICreateConversation) :Promise<IConversation| undefined>=> {
    const res = await fetchClient().post(
      `${API_URL}/conversations/create`,
      data,
    );
    const newConv = res?.data as IConversation;
    if (newConv) return newConv;
  };
  return create;
};
