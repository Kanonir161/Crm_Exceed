import React from 'react';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
import brown from '@material-ui/core/colors/brown';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  badge: {
    padding: '2px 4px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#fff',
    marginRight: '10px',
    marginLeft: '5px',
  },
  active: {
    backgroundColor: yellow[800],
  },
  completed: {
    backgroundColor: green[500],
  },
  pending: {
    backgroundColor: brown[500],
  },
  onGoing: {
    backgroundColor: blue[500],
  },
  stopped: {
    backgroundColor: red[500],
  },
  tiny: {
    padding: '1px 2px',
  },
  small: {
    padding: '3px 6px',
  },

  medium: {
    padding: '4px 8px',
  },

  large: {
    padding: '5px 10px',
  },
  price: {
    color: '#000',
    backgroundColor: '#eee',
    height: '20px',
    fontSize: '15px',
    alignItems: 'center',
  },
  tech: {
    color: '#000',
  },

  junior: {
    backgroundColor: '#1240AB',
  },
  middle: {
    whiteSpace: 'nowrap',
    backgroundColor: '#6F0AAA',
  },
  notStarted: {
    whiteSpace: 'nowrap',
    backgroundColor: '#878787',
  },
  senior: {
    backgroundColor: '#00C90D',
  },
  role: {
    color: 'black',
    backgroundColor: '#9dcdfa',
    transition: 'all 0.25s ease-in-out',
    '&:hover': {
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      cursor: 'default',
    },
  },
  duration: {
    marginTop: 3,
    color: '#000',
    backgroundColor: '#eee',
    height: '20px',
    fontSize: '15px',
    alignItems: 'center',
  },
}));


export default function CustomBadge(props) {
  const classes = useStyles();
  const {
    text, size = 'tiny', theme, status, position, className,
  } = props;

  const badgeClassName = clsx(classes.badge, {
    [classes.price]: theme === 'price',
    [classes.duration]: theme === 'duration',
    [classes.active]: status === 'active',
    [classes.completed]: status === 'completed',
    [classes.stopped]: status === 'stopped',
    [classes.pending]: status === 'pending',
    [classes.onGoing]: status === 'onGoing',
    [classes.medium]: size === 'medium',
    [classes.large]: size === 'large',
    [classes.tech]: theme === 'tech',
    [classes.junior]: position === 'junior',
    [classes.middle]: position === 'middle',
    [classes.junior]: text !== 'Start: Not-started',
    [classes.notStarted]: text === 'Start: Not-started',
    [classes.senior]: position === 'senior',
    [classes.role]: !!position === true,
  }, className);


  return (
    <span className={badgeClassName}>
      {text}
    </span>
  );
}
