import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Autocomplete, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { STUDENT_GENDER, courses } from 'src/_mock/_student';
import countrystatecity from '../../_mock/map/csc.json';

import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useResponsive } from 'src/hooks/use-responsive';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
import { mutate } from 'swr';

// ----------------------------------------------------------------------

export default function StudentNewEditForm({ currentStudent }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const [profilePic, setProfilePic] = useState(null);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    zipCode: Yup.string().required('Zip code is required'),
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      profile_pic: currentStudent?.profile_pic || '',
      firstName: currentStudent?.firstName || '',
      lastName: currentStudent?.lastName || '',
      contact: currentStudent?.contact || '',
      email: currentStudent?.email || '',
      gender: currentStudent?.gender || '',
      course: currentStudent?.course || '',
      education: currentStudent?.education || '',
      school_college: currentStudent?.school_college || '',
      dob: currentStudent?.dob ? new Date(currentStudent.dob) : '',
      joining_date: currentStudent?.joining_date ? new Date(currentStudent.joining_date) : '',
      blood_group: currentStudent?.blood_group || '',
      address_1: currentStudent?.address_detail?.address_1 || '',
      address_2: currentStudent?.address_detail?.address_2 || '',
      country: currentStudent?.address_detail?.country || '',
      state: currentStudent?.address_detail?.state || '',
      city: currentStudent?.address_detail?.city || '',
      zipcode: currentStudent?.address_detail?.zipcode || '',
      enrollment_no: currentStudent?.enrollment_no || '',
      total_amount: currentStudent?.fee_detail?.total_amount || '',
      discount: currentStudent?.fee_detail?.discount || '',
      amount_paid: currentStudent?.fee_detail?.amount_paid || '',
    }),
    
    [currentStudent]
  );
  
  const methods = useForm({
    // resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  //create student api
  async function createStudent(studentPayload) {
    const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/${user?.company_id}/student`;
    const formData = new FormData();
    Object.keys(studentPayload).forEach((key) => {
      formData.append(key, studentPayload[key]);
    });
    if (profilePic) {
      formData.append('profile-pic', profilePic);
    }
    console.log('form ', studentPayload);
    try {
      const response = await axios.post(URL, formData);
      enqueueSnackbar(response?.message || 'Student Created Successfully', { variant: 'success' });
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  }
  console.log("profile_pic : ",profilePic);
  
  //update student api
  async function updateStudent(studentPayload) {
    console.log("data : ",studentPayload);
    const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/student/${currentStudent?._id}`;
    const formData = new FormData();

    Object.keys(studentPayload).forEach((key) => {
      formData.append(key, studentPayload[key]);
    });

    if (profilePic) {
      formData.append('profile-pic', profilePic);
    }
    try {
      const response = await axios.put(URL, formData);
      enqueueSnackbar(response?.message || 'Student Updated Successfully', { variant: 'success' });
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  }
  
  const onSubmit = handleSubmit(async (data) => {
    const studentPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      email: data.email,
      gender: data.gender,
      course: data.course,
      education: data.education,
      school_college: data.school_college,
      dob: data.dob,
      joining_date: data.joining_date,
      blood_group: data.blood_group,
      address_1: data.address_1,
      address_2: data.address_2,
      country: data.country.label,
      state: data.state,
      city: data.city,
      zipcode: data.zipcode,
      enrollment_no: Number(data.enrollment_no),
      total_amount: Number(data.total_amount),
      amount_paid: Number(data.amount_paid),
      discount: Number(data.discount),
    };
    try {
      if (currentStudent?.firstName) {
        await updateStudent(studentPayload);
      } else {
        await createStudent(studentPayload);
      }
      reset();
      router.push(paths.dashboard.student.list);
    } catch (err) {
      console.log('ERROR : ', err);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setProfilePic(file);
        setValue('profile_pic', newFile, { shouldValidate: true });
      }
    },
    [setValue]
    );
  useEffect(() => {
    if (currentStudent) {
      setProfilePic(currentStudent?.profile_pic);
    }
  }, [currentStudent])

    // ============================= HTML CODE VARIABLES =============================
    
    const uploadStudentImage = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Personal Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Basic info, profile pic, Name, Course, Enrollment no...
          </Typography>

          <Card sx={{ pt: 5, px: 3, mt: 5 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar name="profile_pic" onDrop={handleDrop} />
            </Box>
          </Card>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Personal Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="contact" label="Phone Number" />
              <RHFAutocomplete
                name="gender"
                label="Gender"
                placeholder="Choose a gender"
                options={STUDENT_GENDER}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <Stack spacing={1.5}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Date of Birth"
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>
              <RHFTextField name="education" label="Education" />
              <RHFTextField name="school_college" label="School/College" />
              <RHFAutocomplete
                name="course"
                label="Course"
                placeholder="Choose a course"
                options={courses.map((course) => course.label)}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <Stack spacing={1.5}>
                <Controller
                  name="joining_date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Joining Date"
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>
              <RHFTextField name="blood_group" label="Blood Group" />
              <RHFTextField name="enrollment_no" label="Enrollment No" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderAddress = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Address Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Address info, country, state, city...
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Address Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="address_1" label="Address Line 1" />
              <RHFTextField name="address_2" label="Address Line 2" />
              <RHFAutocomplete
                name="country"
                label="Country"
                placeholder="Choose a country"
                options={countries}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="zipcode" label="Zip/Code" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderAmount = (
    <>
      {mdUp && (
        <Grid item md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Fee Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Fee info, total amount, discount, amount paid...
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Fee Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="total_amount" label="Total Amount" />
              <RHFTextField name="amount_paid" label="Amount Paid" />
              <RHFTextField name="discount" label="Discount" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={5}>
        {uploadStudentImage}

        {renderAddress}

        {renderAmount}

        <Grid item xs={12}>
          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => router.push(paths.dashboard.user.list)}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentStudent ? 'Create Student' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

StudentNewEditForm.propTypes = {
  currentStudent: PropTypes.object,
};
