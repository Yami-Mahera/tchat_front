export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  desc: string;
  city: string;
  from: string;
  relationship: number;
  _id: string;
}

export interface IConversation {
  ownerId: IUser;
  memberId: IUser;
  _id: string;
}

export interface IMessages {
  removed: boolean;
  _id: string;
  receiverId: string;
  message: string;
  conversationId: string;
  senderId: string;
  createdAt: Date;
}
