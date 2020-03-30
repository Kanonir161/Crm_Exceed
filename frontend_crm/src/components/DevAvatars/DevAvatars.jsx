import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { findUser } from '../../Redux/Actions/UsersActions/UserActions'

const useStyles = makeStyles(theme => ({
  avatarGroup: {
    padding: '5px',
  },
  avatar: {
    cursor: 'pointer',
    '&:hover': {
      zIndex: '10 !important',
    },
  },
}));

export default function DevAvatars(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { users, setAddUserModalOpen } = props;
  
  function handleClick(userId) {
    dispatch(findUser(userId));
    history.push(`/users/${userId}`);
  }

  
  const devList = users.map((user) =>{
  const userName = `${user.firstName} ${user.lastName}` ;
  return(
    <Tooltip className={classes.avatar} title={userName} key={user.uuid}>
      <Avatar  onClick={() => handleClick(user.uuid)} alt={user.lastName.toUpperCase()} src={`${user.userImage}`} />
    </Tooltip>)
  });

  return (
    <>
      <AvatarGroup key={Math.random()} className={classes.avatarGroup}>
        {devList}
        <Tooltip  className={classes.avatar} title="Add developer to the project">
          <Avatar onClick={() => setAddUserModalOpen(true)} style={{backgroundColor: '#32418c',}}>+</Avatar>
        </Tooltip>
      </AvatarGroup>
      
    </>)
}