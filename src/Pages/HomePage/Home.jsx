import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import homeBG from '../../Assets/homeBG.jpg';

const useStyles = makeStyles(() => ({

  homeTopSection: {
    background: `url(${homeBG}) center /cover no-repeat`,
    minHeight: '100vh',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontSize: '4rem',
    marginLeft: 0,
    padding: 0,
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.homeTopSection}>
        <h1 style={{ marginTop: '150px' }}> Exceed</h1>
      </div>
    </>
  );
}

export default Home;
