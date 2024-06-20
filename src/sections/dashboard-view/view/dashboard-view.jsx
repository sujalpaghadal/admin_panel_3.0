import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _bankingContacts, _bankingCreditCard, _bankingRecentTransitions } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import DashboardAttendenceChart from '../dashboard-attendence-chart';
import DashboardCount from '../dashboard-compony-count';
import { Typography } from '@mui/material';
import DashboardDemoInquiryChart from '../dashboard-demo-inquiry-chart';
import DashboardUpcomingDemo from '../dashboard-upcoming-demo';
import DashboardCourseChart from '../dashboard-course-chart';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <DashboardCount
            title="Weekly Sales"
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <DashboardCount
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <DashboardCount
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <DashboardCount
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid xs={12} md={8}>
          <Stack spacing={3}>
            <DashboardDemoInquiryChart
              title="Balance Statistics"
              subheader="(+43% Income | +12% Expense) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    type: 'Week',
                    data: [
                      {
                        name: 'Income',
                        data: [10, 41, 35, 151, 49, 62, 69, 91, 48],
                      },
                      {
                        name: 'Expenses',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45],
                      },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      {
                        name: 'Income',
                        data: [148, 91, 69, 62, 49, 51, 35, 41, 10],
                      },
                      {
                        name: 'Expenses',
                        data: [45, 77, 99, 88, 77, 56, 13, 34, 10],
                      },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      {
                        name: 'Income',
                        data: [76, 42, 29, 41, 27, 138, 117, 86, 63],
                      },
                      {
                        name: 'Expenses',
                        data: [80, 55, 34, 114, 80, 130, 15, 28, 55],
                      },
                    ],
                  },
                ],
              }}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            <DashboardAttendenceChart
              title="Sale By Gender"
              total={2324}
              chart={{
                series: [
                  { label: 'Mens', value: 44 },
                  { label: 'Womens', value: 75 },
                  { label: 'other', value: 75 },
                ],
              }}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            <DashboardUpcomingDemo
              title="Contacts"
              subheader="You have 122 contacts"
              list={_bankingContacts.slice(-5)}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={8}>
          <Stack spacing={3}>
            <DashboardCourseChart
              title="Expenses Categories"
              chart={{
                series: [
                  { label: 'Category 1', value: 14 },
                  { label: 'Category 2', value: 23 },
                  { label: 'Category 3', value: 21 },
                  { label: 'Category 4', value: 17 },
                  { label: 'Category 5', value: 15 },
                  { label: 'Category 6', value: 10 },
                  { label: 'Category 7', value: 12 },
                  { label: 'Category 8', value: 17 },
                  { label: 'Category 9', value: 21 },
                ],
                colors: [
                  theme.palette.primary.main,
                  theme.palette.warning.dark,
                  theme.palette.success.darker,
                  theme.palette.error.main,
                  theme.palette.info.dark,
                  theme.palette.info.darker,
                  theme.palette.success.main,
                  theme.palette.warning.main,
                  theme.palette.info.main,
                ],
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
