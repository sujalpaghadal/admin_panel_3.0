import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Card } from '@mui/material';
import { useGetConfigs } from 'src/api/config';
import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';
import { Stack } from '@mui/system';

export default function Userrolecreatepage() {
  const { user } = useAuthContext();
  const { configs, mutate } = useGetConfigs();
  const [inputVal, setInputVal] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/configs/${configs._id}`;
    const payload = { ...configs, roles: [...configs.roles, inputVal] };
    axios
      .put(URL, payload)
      .then(() => {
        setInputVal('');
        enqueueSnackbar('User Add Successfully', {
          variant: 'success',
        });
        mutate();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (item) => {
    const filteredRoles = configs.roles.filter((e) => e !== item);
    const apiEndpoint = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/configs/${configs._id}`;
    const payload = { ...configs, roles: filteredRoles };
    axios
      .put(apiEndpoint, payload)
      .then(() => {
        enqueueSnackbar('User Delete Successfully', {
          variant: 'success',
        });
        mutate();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          marginBottom: '10px',
          padding: '10px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              onChange={(e) => setInputVal(e.target.value)}
              label="Role"
              value={inputVal}
              sx={{
                fontSize: '16px',
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              size="small"
              sx={{
                fontSize: '16px',
                height: '100%',
              }}
              variant="outlined"
              color="primary"
              onClick={handleClick}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '100%', maxWidth: '100%', padding: '10px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Box
                  columnGap={2}
                  rowGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    md: 'repeat(3, 1fr)',
                  }}
                >
                  {configs?.roles &&
                    configs?.roles.length !== 0 &&
                    configs?.roles.map((role, index) => (
                      <Grid
                        container
                        sx={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          boxShadow: 4,
                          borderRadius: 1,
                          p: 1,
                          m: 1,
                        }}
                        key={index}
                      >
                        <Grid item>
                          <Typography sx={{ fontSize: '14px' }}>{role}</Typography>
                        </Grid>
                        <Grid item>
                          <Box
                            sx={{ color: 'error.main', cursor: 'pointer' }}
                            onClick={() => handleDelete(role)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
