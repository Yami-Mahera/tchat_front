import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Message from './Message';
import Conversation from './Conversation';
import { IConversation, IMessages, IUser } from '../../Types';
import { getToken } from '../../tools';
import {
  useGetUser,
  useCloseConversation,
  UseGetConversations,
} from '../../action';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  margin: {},
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

const Tchat = () => {
  const classes = useStyles();
  const [conversationId, setConversationId] = React.useState<string>('');
  const [receiverId, setReceiverId] = React.useState<string>('');
  const [conversations, setConversations] = React.useState<IConversation[]>([]);
  const [newUser, setNewUser] = React.useState<Record<string, IUser>>({});
  const [messages, setMessages] = React.useState<IMessages[]>([]);

  const conversationList = UseGetConversations();
  const user = useGetUser();
  const closeConversation = useCloseConversation();
  const userId = getToken();

  React.useEffect(() => {
    if (userId) {
      const f = async () => {
        const res = await user();
        setNewUser(res.data);
      };
      f();
    }
  }, [userId]);

  React.useEffect(() => {
    const f = async () => {
      const res = await conversationList();
      setConversations(res.data);
    };
    f();
  }, []);

  const handleSelecteConersation = (
    newConversationId: string,
    newReceiverId: string,
  ) => {
    setConversationId(newConversationId);
    setReceiverId(newReceiverId);
  };

  const handleCloseConversation = async () => {
    const convDeleted = await closeConversation(conversationId);
    if (convDeleted) {
      setConversations((prev) => [
        ...prev.filter((c) => c?._id !== convDeleted?._id),
      ]);
      setMessages([]);
      setConversationId('');
      setReceiverId('');
    }
  };

  const handleUpdateConversation = (coneversation: IConversation) => {
    setConversations((prev) => [...conversations, coneversation]);
  };

  const handLeSetMessage = (messages: IMessages[]) => {
    setMessages(messages);
  };

  return (
    <div>
      <Grid container direction={'row'}>
        <Grid item xs={6}>
          <Typography variant="h5" className="header-message">
            Tchat
          </Typography>
        </Grid>
        <Grid container item xs={6} justifyContent={'flex-end'}>
          {conversationId && (
            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={handleCloseConversation}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary={newUser?.username || ''}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <Conversation
            {...{
              onSelecteConversation: handleSelecteConersation,
              conversationId,
              conversations,
              onUpdateConversation: handleUpdateConversation,
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Message
            {...{
              conversationId,
              receiverId,
              onSetMessage: handLeSetMessage,
              messages,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Tchat;
