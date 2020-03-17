import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    // border:'1px solid'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  inputForm: {
    width: '100%',
    margin: '5px 0px 10px',
  },
}));

const messegers = [
  { tech: 'Slack' },
  { tech: 'Skype' },
  { tech: 'Whatsapp' },
];

export default function MessagerForm(props) {
  const classes = useStyles();
  const { messagerChange, messagerValue, isEdit } = props; 
  const [messager, setMessager] = useState(isEdit ? messagerValue : []);
  const handleChange = (event, values) => {
    setMessager(values);
    messagerChange(values);
  };
  let filteredMessagers = messegers

  for (const index in messager){
    filteredMessagers = filteredMessagers.filter((t) => {
      return(
      t.tech !== messager[index].tech)})
  }

  return (
    <div>

      <Autocomplete
      multiple
      className={clsx(classes.formControl, classes.inputForm)}
      id="checkboxes-tags-demo"
      options={filteredMessagers}
      disableCloseOnSelect
      getOptionLabel={option => option.tech}
      onChange={handleChange}
      value={messager}
      renderOption={(option, { selected }) => (
        <React.Fragment>
        
          {option.tech}
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={params => (
          <TextField {...params} variant="outlined" label="Messagers" />
        )}
    />
    </div>
  );
}
