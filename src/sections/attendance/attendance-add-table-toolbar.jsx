import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function AttendanceAddTableToolbar({
  filters,
  onFilters,
  dateError,
  serviceOptions,
}) {
  const popover = usePopover();
  const selectRef = useRef(null);

  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterService = useCallback(
    (event) => {
      const selectedId = event.target.value;
      onFilters('service', selectedId);
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onFilters('startDate', newValue);
    },
    [onFilters]
  );

  const handleFilterCurrent = useCallback(
    (newValue) => {
      onFilters('Current', newValue);
    },
    [onFilters]
  );

  const handleClickOutsideSelect = useCallback(
    (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        popover.onClose();
      }
    },
    [popover]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideSelect);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSelect);
    };
  }, [handleClickOutsideSelect]);

  const labelValue = serviceOptions.find((option) => filters?.service === option._id);

  const today = new Date();
  if (!filters.Current) {
    onFilters('Current', today);
  }

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 400 },
          }}
        >
          <InputLabel>Service</InputLabel>

          <Select
            ref={selectRef}
            value={filters.service || ''}
            onChange={handleFilterService}
            input={<OutlinedInput label="Service" />}
            renderValue={(selected) => {
              const selectedOption = serviceOptions.find((option) => option._id === selected);
              return selectedOption ? selectedOption.batch_name : '';
            }}
            sx={{ textTransform: 'capitalize' }}
          >
            {serviceOptions.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.batch_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label="Enter Date"
          value={filters.Current}
          onChange={handleFilterCurrent}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{
            maxWidth: { md: 400 },
          }}
        />
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}

AttendanceAddTableToolbar.propTypes = {
  dateError: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  serviceOptions: PropTypes.array,
};
