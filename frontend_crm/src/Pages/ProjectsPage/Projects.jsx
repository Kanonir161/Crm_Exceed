import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCards from './ProjectsCards.jsx';
import ProjectModal from './ProjectsModal.jsx';
import { getProjects } from '../../Redux/Actions/ProjectsActions/ProjectActions';
import { getUsers } from '../../Redux/Actions/UsersActions/UserActions'
import ProjectFilterPanel from '../../components/ProjectFilterPanel';
import Loading from '../../components/Loading';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  button: {
    fontSize: '13 px',

    minHeight: '40px',
    padding: '0 10px',
  },
  container: {
    marginTop: '20px',
    margin: 'auto',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  projectsHeader: {
    alignItems: 'center',
    maxWidth: '1360px',
    justifyContent: 'space-between',
    display: 'flex',
    margin: '0 auto',
    marginTop: '70px',
  },
  h1: {
    fontSize: '40px',
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.filteredProjects);
  const loading = useSelector((state) => state.projects.loadingProjects);
  useEffect(() => {
    dispatch(getProjects());
    dispatch(getUsers());
  }, [dispatch]);


  return (
    <div style={{ marginLeft: '85px' }}>
      <div className={classes.projectsHeader}>
        <h1>Projects</h1>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => history.push('/projects/addproject')}
        >
          Add project
        </Button>

      </div>
      <ProjectFilterPanel />
      <div className={classes.tableWrapper}>
        {/* <ProjectList classes={classes} /> */}
        <Grid container spacing={1}>
          {loading ? <Loading /> : <ProjectCards projects={projects} />}
        </Grid>
      </div>
      <ProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
