import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {getFirestore, collection, getDocs} from "firebase/firestore";

const Orders = () => {

  const [row, setrow] = useState([]);

  useEffect(() => {
    getDocs(collection(getFirestore(), "post"))
    .then(doc=>{
      doc.forEach(docs=>{
        console.log(docs.data());
        setrow(row=>[row, docs.data()])
      })
    })
  }, [])

function createData(uid, username) {
  return {
    uid,
    username,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
        name: "capsikon"
      },
      {
        date: '2020-01-02',
        customerId: '29384646',
        amount: 1,
        name: "capsikon"
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >{row.uid}</TableCell>
        <TableCell >{row.username}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Prod ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Prod Name</TableCell>
                    <TableCell> price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.customerId}>
                      <TableCell component="th" scope="row">
                        {historyRow.customerId}
                      </TableCell>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell>
                        {historyRow.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('001','Frozen yoghurt'),
  createData('002','Ice cream sandwich'),
  createData('003','Eclair'),
  createData('004','Cupcake'),
  createData('005','Gingerbread'),
];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>User ID</TableCell>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.uid} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

}

export default Orders;
