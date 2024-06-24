import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React from 'react';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { fDate } from 'src/utils/format-time';

const FeesView = ({ currentStudent }) => {

  const TABLE_HEAD = [
    { id: '', label: 'Sr no.' },
    { id: 'installment_date', label: 'Installment Date' },
    { id: 'amount', label: 'Amount' },
    { id: 'payment_date', label: 'Payment Date' },
    { id: 'payment_mode', label: 'Payment Mode' },
    { id: 'status', label: 'Status' },
  ];

  return (
    <>
      <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 800 }}>
            <TableHeadCustom headLabel={TABLE_HEAD} />

            <TableBody>
              {currentStudent?.fee_detail.installments.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{fDate(row.installment_date)}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{fDate(row.payment_date)}</TableCell>
                  <TableCell>{row.payment_mode}</TableCell>
                  <TableCell>
                    <Label
                      variant="soft"
                      color={
                        (row.status === 'paid' && 'success') ||
                        (row.status === 'pending' && 'warning') ||
                        'default'
                      }
                    >
                      {row.status}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </>
  );
};

export default FeesView;
