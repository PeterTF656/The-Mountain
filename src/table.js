import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    minHeight: 300,
  },
});


export default function FaceFeedback(props) {
  const classes = useStyles();

  function createData(name, value) {
    return { name, value };
  }
  
  const rows = [
    createData('肤色', props.skin_color),
    createData('左眼皮', props.left_eyelids),
    createData('右眼皮', props.right_eyelids),
    createData('鱼尾纹', props.crows_feet),
    createData('黑眼圈', props.dark_circle),
    createData('黑头', props.blackhead),
    createData('皮肤类型', props.skin_type),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>分析种类</TableCell>
            <TableCell align="center">反馈报告</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}