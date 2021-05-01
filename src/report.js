import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function DasAlerts({duration, visible, onDurationEnd, children}) {
  const classes = useStyles();
  const [isVisible, setVisibility] = useState(null); 

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  if (!isVisible) return null;

  if (duration) {
    setTimeout(() => {
      setVisibility(false);

      if (onDurationEnd) {
        onDurationEnd(false);
      }
    }, duration);
  }

  return (
    <div className={classes.root}>
      <Alert onClose={() => {}}>{children}</Alert>
    </div>
  );
}