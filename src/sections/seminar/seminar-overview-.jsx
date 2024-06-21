import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Tooltip,
  Container,
  TableBody,
  IconButton,
  TableContainer,
  Box,
  TableRow,
  Checkbox,
  TableCell,
} from '@mui/material';
import axios from 'axios';

import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import { fDate } from 'src/utils/format-time';
import { useBoolean } from 'src/hooks/use-boolean';
import { useGetSeminarOverView } from 'src/api/seminar';
import { useRouter } from 'src/routes/hooks';

const SeminarOverView = [
  { id: 'srNo', label: 'Sr No' },
  { id: 'title', label: 'Title' },
  { id: 'date', label: 'Date' },
  { id: 'present', label: 'Present' },
  { id: 'absent', label: 'Absent', align: 'center' },
  { id: 'total', label: 'Total', align: 'center' },
];

const defaultFilters = {
  name: '',
  status: 'all',
};

export default function InquiryListView() {
  const { enqueueSnackbar } = useSnackbar();
  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);
  const { seminars, SeminarError } = useGetSeminarOverView();

  useEffect(() => {
    if (SeminarError) {
      enqueueSnackbar('Failed to fetch seminars', { variant: 'error' });
    }
  }, [SeminarError, enqueueSnackbar]);

  const dataFiltered = applyFilter({
    inputData: seminars,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 56 : 76;
  const canReset = !!filters.name || filters.status !== 'all';
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={SeminarOverView}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row, index) => {
                    const selected = table.selected.includes(row.id);
                    return (
                      <TableRow hover key={row.id} selected={selected}>
                        <TableCell>
                          <Box>{index + 1}</Box>
                        </TableCell>

                        <TableCell>{row.title}</TableCell>

                        <TableCell>{fDate(row.date_time)}</TableCell>

                        <TableCell align="center"> {row.present_count} </TableCell>
                        <TableCell align="center"> {row.absent_count} </TableCell>

                        <TableCell align="center"> {row.total} </TableCell>
                      </TableRow>
                    );
                  })}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status, name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (seminar) => seminar.title.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((seminar) => seminar.status === status);
  }

  return inputData;
}
