import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Card, Avatar } from '@mui/material';
import { useGetConfigs } from 'src/api/config';
import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';

export default function CompanyProfile() {
  const { user } = useAuthContext();
  const [profilePic, setProfilePic] = useState(null);
  const { configs, mutate } = useGetConfigs();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    name: '',
    logo: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (configs && configs.company_details) {
      setValues((prevValues) => ({
        ...prevValues,
        name: configs.company_details.name || '',
      }));
    }
  }, [configs]);

  console.log(configs);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
    const apiEndpoint = `${import.meta.env.VITE_AUTH_API}/api/company/${user?.company_id}/company-logo`;

    const formData = new FormData();
    formData.append('logo_url', file, file.name);

    try {
      const response = await axios.put(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        enqueueSnackbar(response.data.data.message, {
          variant: 'success',
        });
        mutate();
      }
    } catch (error) {
      console.error('Upload error:', error);
      enqueueSnackbar(error.response?.data?.message || 'An error occurred', {
        variant: 'error',
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/configs/${configs._id}`;
    const payload = { ...configs, company_details: { ...configs.company_details, ...values } };
    console.log(payload);
    try {
      const res = await axios.put(URL, payload);
      if (res.status === 200) {
        enqueueSnackbar('Company name updated successfully', {
          variant: 'success',
        });
        mutate();
      }
    } catch (err) {
      console.error('Update error:', err);
      enqueueSnackbar(err.response?.data?.message || 'An error occurred', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        marginBottom: '10px',
        padding: '10px',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Box sx={{ marginBottom: '20px' }}>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Avatar
                    alt="Avatar"
                    src={configs?.company_details?.logo || ''}
                    onClick={() => document.getElementById('file-input').click()}
                    style={{
                      cursor: 'pointer',
                      width: 96,
                      height: 100,
                      margin: 'auto',
                      fontSize: '10px',
                    }}
                  >
                    Upload Logo
                  </Avatar>
                </Box>

                <TextField
                  label="Company Name"
                  id="name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                />
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                  <LoadingButton 
                    type="submit" 
                    variant="contained" 
                    size="small"
                    loading={loading}
                  >
                    Save Changes
                  </LoadingButton>
                </Grid>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
