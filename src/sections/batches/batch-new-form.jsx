// import React, { useState } from 'react';
// import * as Yup from 'yup';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { useRouter } from 'src/routes/hooks';
// import { useBoolean } from 'src/hooks/use-boolean';
// import { useResponsive } from 'src/hooks/use-responsive';
// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
// import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
// import axios from 'axios';
// import { paths } from 'src/routes/paths';
// import moment from 'moment';
// import { useGetStudents } from 'src/api/student';
// import { useAuthContext } from 'src/auth/hooks';
// import RHFAutocomplete1 from 'src/components/hook-form/batch-autocomplete';

// const BatchNewForm = () => {
//   const [studentIds, setStudentIds] = useState([]);

//   const router = useRouter();
//   const mdUp = useResponsive('up', 'md');
//   const { enqueueSnackbar } = useSnackbar();
//   const preview = useBoolean();
//   const { students } = useGetStudents();
//   const [studentName, setStudentName] = useState([]);
//   const { user } = useAuthContext();
//   const NewBlogSchema = Yup.object().shape({
//     technology: Yup.string().required('Technology is required'),
//     batch_time: Yup.string().required('Time is required'),
//     batch_name: Yup.string().required('Batch Name is required'),
//     batch_members: Yup.array().required('Batch Mamber is required'),
//   });

//   const methods = useForm({
//     resolver: yupResolver(NewBlogSchema),
//     defaultValues: {
//       technology: '',
//       batch_time: null,
//       batch_name: '',
//       batch_members: [],
//     },
//   });

//   students.map((data) => {
//     const name = `${data.firstName} ${data.lastName}`;
//     studentName.push({ name: name, _id: data._id });
//   });
//   const handleStudentId = (event, newValue) => {
//     const selectedIds = newValue.map((student) => student.student_user_id);
//     setStudentIds(selectedIds);
//   };
//   const {
//     reset,
//     setValue,
//     handleSubmit,
//     control,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const a = data.batch_members.map((item) => item._id);
//       const payload = { ...data, batch_members: a };
//       URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/${user?.company_id}/batch`;
//       await axios
//         .post(URL, payload)
//         .then((res) => {
//           enqueueSnackbar('Create success!');
//         })
//         .catch((err) => console.log(err));

//         router.push(paths.dashboard.batches.root);
//         preview.onFalse();
//     } catch (error) {
//       console.log('Error :', error);
//     }
//   });

//   const renderDetails = (
//     <>
//       {mdUp && (
//         <Grid md={4}>
//           <Typography variant="h6" sx={{ mb: 0.5 }}>
//             Details
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//             Technology, Time...
//           </Typography>
//         </Grid>
//       )}

//       <Grid xs={12} md={8}>
//         <Card>
//           {!mdUp && <CardHeader title="Details" />}

//           <Stack spacing={3} sx={{ p: 3 }}>
//             <RHFTextField name="technology" label="Technology" />
//             <RHFTextField name="batch_name" label="Batch Name" />
//             <Controller
//               name="batch_time"
//               control={control}
//               render={({ field }) => (
//                 <MobileTimePicker
//                   orientation="portrait"
//                   label="Batch Time"
//                   value={field.value}
//                   onChange={(newValue) => field.onChange(newValue)}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       margin: 'normal',
//                     },
//                   }}
//                 />
//               )}
//             />

//             <RHFAutocomplete1 control={methods.control} studentName={studentName} />
//           </Stack>

//         </Card>
//         <Stack sx={{ my: '30px', alignItems: 'flex-end' }}>
//           <Button type="submit" variant="contained">
//             Submit
//           </Button>
//         </Stack>
//       </Grid>
//     </>
//   );

//   return (
//     <>
//       <FormProvider methods={methods} onSubmit={onSubmit}>
//         <Grid container spacing={3}>
//           {renderDetails}
//         </Grid>
//       </FormProvider>
//     </>
//   );
// };

// export default BatchNewForm;

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Stack, Button, Grid, CardHeader, Typography } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import axios from 'axios';
import { paths } from 'src/routes/paths';
import { useGetStudents, useGetStudentsList } from 'src/api/student';
import { useAuthContext } from 'src/auth/hooks';
import RHFAutocomplete1 from 'src/components/hook-form/batch-autocomplete';
import { useGetFaculty } from 'src/api/faculty';

const BatchNewForm = () => {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { faculty } = useGetFaculty();
  const preview = useBoolean();
  const { students } = useGetStudentsList(user?.company_id);
  const [studentName, setStudentName] = useState([]);
  const [facultyName, setFacultyName] = useState([]);
  useEffect(() => {
    if (students) {
      setStudentName(students);
    }
    if (faculty) {
      setFacultyName(faculty);
    }
  }, [students, faculty]);

  const NewBlogSchema = Yup.object().shape({
    technology: Yup.string().required('Technology is required'),
    batch_time: Yup.string().required('Time is required'),
    batch_name: Yup.string().required('Batch Name is required'),
    // faculty: Yup.string().required('Faculty Name is required'),
    batch_members: Yup.array().required('Batch Member is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues: {
      technology: '',
      faculty: null,
      batch_time: null,
      batch_name: '',
      batch_members: [],
    },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const batchMemberIds = data.batch_members?.map((member) => member._id);

    try {
      const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user?.company_id}/batch`;
      await axios.post(URL, {
        ...data,
        batch_members: batchMemberIds,
        faculty: data?.faculty?._id,
      });
      enqueueSnackbar('Create success!');
      router.push(paths.dashboard.batches.root);
      preview.onFalse();
    } catch (error) {
      console.log('Error:', error);
    }
  });
  const technology = [
    'Full-Stack',
    'Flutter',
    'Game',
    'Ui/Ux',
    'C++ programing',
    'C programing',
    'CCC language',
    'HTML',
    'CSS',
  ];
  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Technology, Time...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFAutocomplete
              name="technology"
              type="technology"
              label="Technology"
              placeholder="Choose a technology"
              fullWidth
              options={technology.map((option) => option)}
              getOptionLabel={(option) => option}
            />
            {/* <RHFTextField name="technology" label="Technology" /> */}
            <RHFTextField name="batch_name" label="Batch Name" />
            <Controller
              name="batch_time"
              control={control}
              render={({ field }) => (
                <MobileTimePicker
                  orientation="portrait"
                  label="Batch Time"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />
              )}
            />
            <RHFAutocomplete
              name="faculty"
              type="faculty"
              label="Facult Name"
              placeholder="Choose a faculty"
              fullWidth
              options={facultyName.map((option) => option)}
              getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
            />
            <RHFAutocomplete1 name={'batch_members'} control={control} studentName={studentName} />
          </Stack>
        </Card>
        <Stack sx={{ my: '30px', alignItems: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container>{renderDetails}</Grid>
    </FormProvider>
  );
};

export default BatchNewForm;
