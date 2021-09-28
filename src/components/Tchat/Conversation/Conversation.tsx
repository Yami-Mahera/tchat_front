import React, { useEffect, useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import { useGetUsers } from '../../../action';
import DialogeAddContact from '../../common/DialogeAddContact';
import { IConversation, IUser } from '../../../Types';
import { getToken } from '../../../tools';

interface IpropsConversation {
  onSelecteConversation: (
    newConversationId: string,
    newReceiverId: string,
  ) => void;
  conversationId: string;
  conversations: IConversation[];
  onUpdateConversation: (c: IConversation) => void;
}

const Conversation = ({
  onSelecteConversation,
  conversationId,
  conversations,
  onUpdateConversation,
}: IpropsConversation) => {
  const userList = useGetUsers();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedValue, setSelectedValue] = useState(users[0]?._id);

  useEffect(() => {
    const f = async () => {
      const res = await userList();
      const usersList: IUser[] | undefined = res?.data;
      if (usersList) {
        const usersFilter: IUser[] = usersList.reduce(
          (acc: IUser[], curr: IUser) => {
            const found = conversations.find(
              (conv) =>
                conv?.memberId?._id === curr?._id ||
                conv?.ownerId._id === curr?._id,
            );
            found ?? acc.push(curr);
            return acc;
          },
          [],
        );
        setUsers(usersFilter);
      }
    };
    f();
    // eslint-disable-next-line
  }, [conversations]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const userId = getToken();

  return (
    <React.Fragment>
      <Button variant="contained" onClick={() => handleClickOpen()}>
        Créer une conversation
      </Button>
      <List dense>
        {conversations.map((conversation, i) => (
          <ListItem
            key={i}
            button
            selected={Boolean(conversationId === conversation._id)}
            onClick={() =>
         {               
          onSelecteConversation(
                conversation._id,
                conversation?.memberId?._id,
              )}
            }
          >
            <ListItemIcon>
              <Avatar alt="Remy Sharp" />
            </ListItemIcon>
            <ListItemText
              primary={
                userId === conversation?.memberId._id
                  ? conversation?.ownerId?.username
                  : conversation?.memberId?.username
              }
              key={conversation._id}
            />
          </ListItem>
        ))}
      </List>
      <DialogeAddContact
        {...{
          open,
          onClose: handleClose,
          users,
          selectedValue,
          onUpdateConversation: onUpdateConversation,
        }}
      />
    </React.Fragment>
  );
};

export default Conversation;
