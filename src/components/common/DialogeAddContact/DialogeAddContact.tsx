import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';

import { blue } from '@material-ui/core/colors';
import { IConversation, IUser } from '../../../Types';
import { UseCreateConversation } from '../../../action';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface DialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  users: IUser[];
  onUpdateConversation: (conversation: IConversation) => void;
}

const DialogeAddContact = (props: DialogProps) => {
  const classes = useStyles();
  const { onClose, selectedValue, open, users, onUpdateConversation } = props;

  const createConversation = UseCreateConversation();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value: string) => {
    const newConversation = await createConversation({ memberId: value });
    if (newConversation) onUpdateConversation(newConversation);
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Nouvelle conversation</DialogTitle>
      <List>
        {users.map((user) => (
          <ListItem
            button
            onClick={() => handleListItemClick(user._id)}
            key={user._id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user?.username} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default DialogeAddContact;
