import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';

import { useCreateMessage, useGetMessages, useGetUser } from '../../../action';
import { IMessages, IUser } from '../../../Types';
import { getToken } from '../../../tools';

import './style.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});
interface IpropsConversation {
  conversationId: string;
  receiverId: string;
  onSetMessage: (messages: IMessages[]) => void;
  messages: IMessages[];
}

const Message = (props: IpropsConversation) => {
  const { conversationId, receiverId, onSetMessage, messages } = props;
  const [message, setMessage] = useState<string>('');

  const createMessage = useCreateMessage();
  const getMessage = useGetMessages();
  const user = useGetUser();

  const classes = useStyles();

  useEffect(() => {
    const f = async () => {
      if (conversationId) {
        const res = await getMessage({ conversationId });
        const messageList: IMessages | undefined = res.data;
        if (messageList) onSetMessage(res.data);
      }
    };
    f();
    // eslint-disable-next-line
  }, [conversationId]);

  const handleCreateMessage = async () => {
    const newMessage = await createMessage({
      message,
      conversationId,
      receiverId,
    });

    if (newMessage) {
      onSetMessage([...messages, newMessage]);
      setMessage('');
    }
  };

  const messagesEndRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }, [message]);
  const [userConnected, setUserConnected] = useState<Record<string, IUser>>({});
  const userId = getToken();
  useEffect(() => {
    if (userId) {
      const f = async () => {
        const res = await user();
        //@ts-ignore    
        setUserConnected(res?.data);
      };
      f();
    }
    // eslint-disable-next-line
  }, [userId]);
  
  if (!conversationId) return <div className="content_msg"><div className="child">Bienvenue {userConnected?.username}</div></div>;

  return (
    <>
      <List className={classes.messageArea} ref={messagesEndRef}>
        {messages?.map((message, i) => {
          const time: string = new Date(message?.createdAt).toLocaleTimeString();
          return (
            <ListItem key={i}>
              <Grid
                container
                item
                justifyContent={
                  userId === message?.senderId ? 'flex-end' : 'flex-start'
                }
              >
                <ListItemIcon
                  //@ts-ignore
                  align={userId === message?.senderId ? 'right' : 'left'}
                >
                  {userId === message?.senderId ? '' : <Avatar alt="Remy Sharp" />}
                </ListItemIcon>
                <Grid container item xs={12}>
                  <ListItemText
                    //@ts-ignore
                    align={userId === message?.senderId ? 'right' : 'left'}
                    primary={message?.message}
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    //@ts-ignore
                    align={userId === message?.senderId ? 'right' : 'left'}
                    secondary={time}
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
            value={message}
            {...{ onChange: (e) => setMessage(e.target.value) }}
          />
        </Grid>
        <Grid item xs={1} onClick={handleCreateMessage}>
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
};

export default Message;


