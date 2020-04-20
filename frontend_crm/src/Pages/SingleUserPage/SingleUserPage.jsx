import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { TextField, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import KeyboardArrowRightSharpIcon from '@material-ui/icons/KeyboardArrowRightSharp';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import UserTableRowButtons from '../../components/UserTableRowButtons/UserTableRowButtons.jsx';
import Loading from '../../components/Loading/index.jsx';
import {
  getUser, deleteUser, getUsers, updateUser,
} from '../../Redux/Actions/UsersActions/UserActions';
import PopUpDeleteUser from './PopUpDeleteUser.jsx';
import { inviteUsers } from '../../Redux/Actions/AuthActions/AuthActions';
import '../../components/UserTableRow/style.css';
import TasksTable from '../../components/TasksTable/TasksTable.jsx';

const useStyles = makeStyles(() => ({
  container: {
    margin: '100px 10px 0 85px',
  },
  footerIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    margin: '0 auto',
    maxWidth: '900px',
    marginTop: '30px',
    color: '#444',
  },
  content: {
    margin: '0px 20px',
    display: 'flex',
  },

  userImage: {
    width: 160,
    height: 160,
    borderRadius: 120,
    backgroundSize: 'cover !important',
    margin: 20,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftCol: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  fieldName: {
    display: 'block;',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    padding: '10px 10px 10px 20px',
  },
  fieldTitle: {
    display: 'block;',
    fontSize: 16,
    fontWeight: 'bold',
  },
  field: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 16,
    paddingLeft: '5px',
    display: 'flex',
  },
  stackAndDuration: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    margin: '4px 13px',
    paddingBottom: '10px',
  },
  duration: {
    margitTop: '3px  !important',
  },
  breadcrumbs: {
    margin: '85px 20px',
    color: '#777777',
  },
  link: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  paperHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteButton: {
    padding: '7px',
    fontSize: '13px',
  },
}));

const UserInfo = ({ match: { params: { userId }, path } }) => {
  const history = useHistory();
  const classes = useStyles();
  const [curTask, setCurTask] = useState(true);
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);
  const token = localStorage.getItem('token');

  const [taskHistoryTable, setTaskHistoryTable] = useState(true);


  const handleClickOpenPopUp = () => {
    setOpenPopUp(true);
  };
  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleClickOnBack = () => {
    if (path === '/users/:userId') history.goBack();
    history.push('/users');
  };

  const handleClickOnDelete = () => {
    dispatch(deleteUser(userId));
    history.push('/users');
  };

  const handleClickOnEdit = () => {
    history.push(`/user/edituser/${userId}`);
  };

  const handleClickInvite = () => {
    dispatch(inviteUsers(userId));
  };

  const handleCloseTaskTable = () => {
    setTaskHistoryTable(!taskHistoryTable);
  };
  const user = useSelector((state) => state.users.currentUser);

  const [changedFields, setChangedFields] = useState(user);
  const [newTask, setNewTask] = useState(user ? {
    user_uuid: user.uuid,
    creator_uuid: '',
    text: '',
  } : '');

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_API}history-tasks`, { ...newTask, user_uuid: user.uuid }, { headers: { authorization: token } });
    const taskId = response.data.uuid;
    dispatch(updateUser({ ...changedFields, current_task: taskId }));
    dispatch(getUser(user.uuid));
    // setChangedFields({ ...changedFields, current_task: response.data.text });
    setCurTask(!curTask);
  };

  useEffect(() => {
    if (!user || !user.Users_Milestones || !user.UsersTasks) {
      dispatch(getUsers('', '', '', true));
      dispatch(getUser(userId));
    }
    setChangedFields(user);
  }, [dispatch, userId, user]);

  if (!user) return (<Loading />);

  const imgUrl = user.userImage || 'https://themicon.co/theme/centric/v2.0/static-html5/src/images/04.jpg';
  let userCurrentTask;

  if (user.UsersTasks !== undefined) {
    userCurrentTask = user.UsersTasks.find((task) => user.current_task === task.uuid);
    userCurrentTask = userCurrentTask === undefined ? '' : userCurrentTask.text;
  }

  return (
    <div className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        <Typography className={classes.link} onClick={() => history.push('/users')}>
          Users
        </Typography>
        <Typography color="textPrimary" onClick={() => history.push(`/user/${user.uuid}`)}>
          {' '}
          {user.firstName}
          {' '}
          {user.lastName}
        </Typography>
      </Breadcrumbs>
      <Paper className={classes.root}>
        <div className={clsx(classes.content, classes.paperHeader)}>
          <h1>
            {user.firstName}
            {' '}
            {user.lastName}
          </h1>
          <Tooltip title={user.email ? 'Send invite to email' : 'There is no email. Add email to the user'}>
            <span>
              <Button
                onClick={handleClickInvite}
                disabled={!user.email}
                variant="outlined"
                color="primary"
                size="large"
                className={classes.inviteButton}
              >
                Reset password
              </Button>
            </span>
            {/* </div> */}
          </Tooltip>
        </div>
        <Divider />
        <div className={classes.row}>
          <div className={classes.leftCol}>
            <div className={classes.userImage} style={{ background: `url(${imgUrl}) no-repeat` }} />
            <span className={classes.fieldName}>
              {user.firstName}
              {' '}
              {user.lastName}
            </span>
          </div>
          <div className={classes.col}>
            <div className={classes.body}>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Email: </span>
                <div className={classes.fieldValue}>
                  {user.email || '―'}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Phone: </span>
                <div className={classes.fieldValue}>
                  {user.phone1 || '―'}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Second Phone: </span>
                <div className={classes.fieldValue}>
                  {user.phone2 || '―'}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Role: </span>
                <div className={classes.fieldValue}>
                  {user.role || '―'}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Project Ready </span>
                <div className={classes.fieldValue}>
                  {user.project_ready || '―'}
                  %
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Current Task: </span>
                <div className="raw" style={{ display: 'flex', alignItems: 'center' }}>
                  { userCurrentTask !== undefined && curTask ? (
                    <Typography variant="inherit">
                      {userCurrentTask.split('\n').map((i, key) => <div key={key}>{i}</div>)}
                    </Typography>
                  )
                    : (
                      <div>
                        <TextField
                          onChange={handleTaskChange}
                          value={newTask.text || ''}
                          variant="outlined"
                          label="New task"
                          multiline
                          rowsMax="5"
                          name='text'
                          style={{ width: '100%', marginBottom: 5 }}
                        />
                      </div>
                    )}
                  <div className="buttons">
                    <UserTableRowButtons
                      handleAddTask={handleAddTask}
                      changedFields={changedFields}
                      state={curTask}
                      setState={setCurTask}
                      setChangedFields={setChangedFields}
                      user={user}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Current Occupation: </span>
                <div className={classes.fieldValue}>
                  {user.current_occupation || '―'}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Total load: </span>
                <div className={classes.fieldValue}>
                  {user.total_load || '―'}
                </div>
              </div>
              <div className={classes.field}>
                <span className={classes.fieldTitle}>Task History: </span>
                {taskHistoryTable
                  ? (
                    <Button onClick={handleCloseTaskTable} style={{ padding: 0 }}>
                      <KeyboardArrowRightSharpIcon />
                    </Button>
                  )
                  : (
                    <Button onClick={handleCloseTaskTable} style={{ padding: 0 }}>
                      <KeyboardArrowDownSharpIcon />
                    </Button>
                  )}
              </div>
              {taskHistoryTable || user.UsersTasks === undefined ? ''
                : (
                  <TasksTable
                    user={user}
                    userName={user.fullName}
                    tasks={user.UsersTasks}
                  />
                ) }
            </div>
          </div>
        </div>
        <Divider />
        <div className={classes.footerIcons}>
          <Button onClick={handleClickOnBack}>
            <ArrowBackIosIcon />
          </Button>
          <Button onClick={handleClickOnEdit}>
            <EditSharpIcon />
          </Button>
          <Button onClick={handleClickOpenPopUp} className={classes.deleteButton}>
            <DeleteOutlineIcon />
          </Button>
        </div>
      </Paper>
      <PopUpDeleteUser
        handleClickOnDelete={handleClickOnDelete}
        handleClosePopUp={handleClosePopUp}
        openPopUp={openPopUp}
      />
    </div>
  );
};

UserInfo.propTypes = {
  match: PropTypes.object,
};
UserInfo.defaultProps = {
  match: {},
};

export default UserInfo;
