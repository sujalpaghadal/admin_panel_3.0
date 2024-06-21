import React, { useEffect, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button, TextField, Grid, Box, Container } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Autocomplete } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useSettingsContext } from 'src/components/settings';
import axiosInstance from 'src/api/axiosInstance';
import { useSnackbar } from 'src/components/snackbar';
import axios from 'axios';
import SeminarOverView from './seminar-overview-';

export default function SeminarNewEditForm() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    schedule_by: Yup.string().required('Schedule by is required'),
    date_time: Yup.date().required('Date and Time are required').nullable(),
    role: Yup.string().required('Role is required'),
    users: Yup.array().min(1, 'At least one user is required').required('Users are required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      title: '',
      schedule_by: '',
      date_time: null,
      role: '',
      users: [],
    },
  });

  const ROLE = ['Employee', 'Student'];

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setValue,
    watch,
  } = methods;

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      date_time: data.date_time,
      schedule_by: data.schedule_by,
      attended_role: data.role,
      attended_by: data.users.map((user) => ({ attended_id: user._id })),
    };
    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/seminar`;
      const response = await axiosInstance.post(URL, payload);
      console.log(response.data);
      enqueueSnackbar(response.data.data.message, { variant: 'success' });
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Failed to fetch seminars', { variant: 'error' });
    }
  };

  const fetchUsers = async (role) => {
    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/role/${role}`;
      const response = await axios.get(URL);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedRole) {
      fetchUsers(selectedRole);
    }
  }, [selectedRole]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'role') {
        setSelectedRole(value.role);
        setValue('users', []);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <Grid container spacing={4}>
      <Grid item md={4}>
        <FormProvider {...methods}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Seminar Form
            </Typography>
            <Box
              component="form"
              display="grid"
              gridTemplateColumns="repeat(1, 1fr)"
              gap={3}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="title"
                control={control}
                render={({ field }) => <TextField {...field} label="Title" fullWidth />}
              />
              <Controller
                name="schedule_by"
                control={control}
                render={({ field }) => <TextField {...field} label="Schedule by" fullWidth />}
              />
              <Controller
                name="date_time"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    label="Date and Time"
                    {...field}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={ROLE}
                    getOptionLabel={(option) => option}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => <TextField {...params} label="Role" />}
                  />
                )}
              />
              <Controller
                name="users"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={users}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => <TextField {...params} label="Users" />}
                    getOptionSelected={(option, value) => option.id === value.id}
                  />
                )}
              />
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Grid>
      <Grid item xs={12} md={8}>
        <SeminarOverView />
      </Grid>
    </Grid>
  );
}
