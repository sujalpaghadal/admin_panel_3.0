import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import DemoEditPop from './demo-edit-pop';

// ----------------------------------------------------------------------

export default function DemoTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
  srNumber,
}) {
  console.log(row, 'row');
  const { demos, inquiry } = row;
  const { firstName, lastName, email, contact } = inquiry;
  const { date, status, technology, detail, faculty } = demos[0];
  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Box
        // onClick={onViewRow}
        // sx={{
        //   cursor: 'pointer',
        //   '&:hover': {
        //     textDecoration: 'underline',
        //   },
        // }}
        >
          {srNumber}
        </Box>
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText
          primary={firstName + ' ' + lastName}
          secondary={email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell>
        <Box>{contact}</Box>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: 'action.hover',
            }),
          }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <>
      <TableRow>
        <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
          <Collapse
            in={collapse.value}
            timeout="auto"
            unmountOnExit
            sx={{ bgcolor: 'background.neutral' }}
          >
            <Stack component={Paper} sx={{ m: 1.5 }}>
              {demos.map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  alignItems="center"
                  sx={{
                    p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                    '&:not(:last-of-type)': {
                      borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                    },
                  }}
                >
                  <Avatar
                    src={faculty.avatar_url}
                    variant="rounded"
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <ListItemText
                    primary={faculty.firstName + ' ' + faculty.lastName}
                    secondary={faculty.email}
                    primaryTypographyProps={{
                      typography: 'body2',
                    }}
                    secondaryTypographyProps={{
                      component: 'span',
                      color: 'text.disabled',
                      mt: 0.5,
                    }}
                  />
                  <TableCell sx={{ mx: 5 }}>
                    <ListItemText
                      primary={fDate(date)}
                      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                      secondaryTypographyProps={{
                        mt: 0.5,
                        component: 'span',
                        typography: 'caption',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ mx: 5 }}>
                    <Box>{technology}</Box>
                  </TableCell>
                  <TableCell sx={{ mx: 5 }}>
                    <Box>{detail}</Box>
                  </TableCell>
                  <TableCell sx={{ mx: 5 }}>
                    <Label
                      variant="soft"
                      color={
                        (status === 'completed' && 'success') ||
                        (status === 'pending' && 'warning') ||
                        (status === 'cancelled' && 'error') ||
                        'default'
                      }
                    >
                      {status}
                    </Label>
                  </TableCell>
                  <MenuItem
                    onClick={() => {
                      onEditRow();
                      popover.onClose();
                    }}
                  >
                    <Iconify icon="solar:eye-bold" />
                  </MenuItem>
                </Stack>
              ))}
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
      <DemoEditPop open={true} />
    </>
  );

  return (
    <>
      {renderPrimary}
      {renderSecondary}
    </>
  );
}

DemoTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};
