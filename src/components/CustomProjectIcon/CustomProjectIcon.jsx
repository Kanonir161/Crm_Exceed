import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { findProject } from '../../Redux/Actions/ProjectsActions/ProjectActions';

const useStyles = makeStyles(() => ({
  avatarGroup: {
    padding: '5px',
  },
  avatar: {
    cursor: 'pointer',
    '&:hover': {
      zIndex: '10 !important',
    },
  },
  skeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    background: '#ccc',
  },
}));

const CustomProjectIcon = ({
  user,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();


  const handleClick = (projectId) => {
    dispatch(findProject(projectId));
    history.push(`/customers/${projectId}`);
  };

  const projectsList = user.UserMilestones.map((milestone) => (
    <Tooltip className={classes.avatar} title={milestone.Projects.name} key={Math.random()}>
      <Avatar
        onClick={() => handleClick(milestone.project_uuid)}
        alt={milestone.Projects.name}
        src={`${milestone.userImage}`}
      />
    </Tooltip>
  ));

  return (
    <AvatarGroup key={Math.random()} className={classes.avatarGroup} max={4}>
      {projectsList}
    </AvatarGroup>
  );
};

CustomProjectIcon.propTypes = {
  projects: PropTypes.array,
  addProject: PropTypes.func,
  edit: PropTypes.bool,
};

export default CustomProjectIcon;
