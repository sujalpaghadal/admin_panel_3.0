import { Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { authRoutes } from './auth';
import { HomePage, mainRoutes } from './main';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';
import LoginPage from 'src/pages/auth/jwt/login';
import { Grid } from '@mui/material';
import login from '../../assets/login-back/loginBack.webp';
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          {/* <HomePage /> */}
          <AuthClassicLayout>
            <LoginPage />
          </AuthClassicLayout>
          {/* <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundImage: `url(${login})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Grid item md={3} sx={{backgroundColor:'white',padding:5,borderRadius:"15px"}}>
              <LoginPage />
            </Grid>
          </Grid> */}
        </MainLayout>
      ),
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
