import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Express from '../../Assets/devIcons/Express.svg';
import C from '../../Assets/devIcons/C.svg';
import ReactDev from '../../Assets/devIcons/ReactDev.svg';
import Node from '../../Assets/devIcons/Node.svg';
import MongoDb from '../../Assets/devIcons/MongoDb.svg';

const useStyles = makeStyles(() => ({

  tiny: {
    height: '10px',
    width: '10px',
    padding: '1px 2px',
  },
  small: {
    height: '20px',
    width: '20px',
    padding: '3px 6px',
  },

  medium: {
    height: '25px',
    width: '25px',
    padding: '4px 10px',
  },

  large: {
    height: '30px',
    width: '30px',
    padding: '5px 12px',
  },
}));
const icons = [
  Express,
  C,
  ReactDev,
  MongoDb,
  Node,
];

function StackIcon(props) {
  const classes = useStyles();
  const {
    size, tech, className,
  } = props;

  const iconClassName = clsx(classes.badge, {
    [classes.small]: size === 'small',
    [classes.medium]: size === 'medium',
    [classes.large]: size === 'large',
  }, className);

  const findedIcon = icons.find((elem) => elem.includes(tech));
  return (

    <div className={iconClassName} style={{ background: `url(${findedIcon})` }} />

  );
}

export default StackIcon;
