import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  body: {
    fontSize: theme.typography.pxToRem(8),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function OrganFeedback(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>三庭五眼分析</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.body}>
            {props.court_resp}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>眼部分析</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.body}>
            {props.eye_resp}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>鼻部分析</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.body}>
          {props.eye_resp}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}