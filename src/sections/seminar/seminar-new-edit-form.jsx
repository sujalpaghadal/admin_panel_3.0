import React, { useEffect, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useRouter } from 'src/routes/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button, TextField, Grid, Box, Autocomplete } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useResponsive } from 'src/hooks/use-responsive';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
import { useSnackbar } from 'src/components/snackbar';
import { paths } from 'src/routes/paths';

export default function SeminarNewEditForm({ SeminarId }) {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const mdUp = useResponsive('up', 'md');
  const [selectedRole, setSelectedRole] = useState('');
  const router = useRouter();
  const [allUser, setAllUser] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    schedule_by: Yup.string().required('Schedule by is required'),
    date_time: Yup.date().required('Date and Time are required').nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      title: '',
      schedule_by: '',
      date_time: null,
      role: '',
      desc: '',
      users: [],
    },
  });

  console.log(user);

  const ROLE = ['Employee', 'Student'];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_AUTH_API}/api/company/${user?.company_id}/user/list`
        );
        setAllUser(response.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    getUsers();
  }, [user?.company_id]);

  const filter = allUser.map((data) => `${data?.firstName} ${data?.lastName}`);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    setValue,
    reset,
    watch,
  } = methods;

  useEffect(() => {
    const fetchSeminarById = async () => {
      try {
        if (SeminarId) {
          const URL = `${import.meta.env.VITE_AUTH_API}/api/company/seminar/${SeminarId}`;
          const response = await axios.get(URL);
          const { data } = response.data;
          reset({
            title: data.title,
            desc: data.desc,
            date_time: data?.date_time ? new Date(data.date_time) : null,
            schedule_by: data.schedule_by.firstName + data.schedule_by.lastName,
          });
        }
      } catch (error) {
        console.error('Failed to fetch seminar:', error);
      }
    };

    fetchSeminarById();
  }, [SeminarId, reset]);

  const postSeminar = async (payload) => {
    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/company/seminar`;
      const response = await axios.post(URL, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating seminar:', error.message);
      throw error;
    }
  };

  const updateSeminar = async (payload) => {
    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/company/seminar/${SeminarId}`;
      const response = await axios.put(URL, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating seminar:', error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    const assignObject = allUser.find(
      (item) => `${item.firstName} ${item.lastName}` === data.schedule_by
    );

    const payload = {
      title: data.title,
      desc: data.desc,
      company_id: user.company_id,
      date_time: data.date_time,
      schedule_by: assignObject?._id,
      attended_by: data.users.map((attended_by) => attended_by._id),
    };
    console.log(payload);
    try {
      let response;

      if (SeminarId) {
        response = await updateSeminar(payload);
        console.log(response);
        router.push(paths.dashboard.seminar.list);
        enqueueSnackbar(response.message, { variant: 'success' });
      } else {
        response = await postSeminar(payload);
        enqueueSnackbar(response.message, { variant: 'success' });
        router.push(paths.dashboard.seminar.list);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar(error.response.message, { variant: 'error' });
    }
  };

  const fetchUsers = async (role) => {
    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/role/${role}`;
      const response = await axios.get(URL);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
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
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Seminar Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Seminar , role, Schedule by...
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <FormProvider {...methods}>
          <Box sx={{ p: 3 }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              display="grid"
              gridTemplateColumns="repeat(1, 1fr)"
              gap={3}
            >
              <Controller
                name="title"
                control={control}
                render={({ field }) => <TextField {...field} label="Title" fullWidth />}
              />

              <RHFAutocomplete
                name="schedule_by"
                label="Schedule By"
                placeholder="Choose a contact person"
                fullWidth
                options={filter}
                getOptionLabel={(option) => option}
              />

              <Controller
                name="date_time"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="Date and Time"
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
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                  />
                )}
              />

              <RHFTextField name="desc" label="Description" multiline rows={4} />

              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

SeminarNewEditForm.propTypes = {
  SeminarId: PropTypes.string,
};
