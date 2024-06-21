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
import axios from 'axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const theme = useTheme();
  const [demo,setDemo] = useState([])
  const getDemos = () => {
    axios
      .get('https://admin-panel-dmawv.ondigitalocean.app/api/v2/664ec61d671bf9a7f53664b5/demo')
      .then((res) =>  setDemo(res?.data?.data[0]?.demos))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDemos()
    
  }, [])
  const dd = [76, 42, 29, 41, 27, 138, 117, 86, 63];
  const filter = demo.filter((data) => new Date(data?.date) < new Date());
  // console.log(filter,"fffffff");

  const settings = useSettingsContext();
  // https://admin-panel-dmawv.ondigitalocean.app/api/v2/664ec61d671bf9a7f53664b5/demo
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Hi, Welcome back 🍌 🍌 🐗 🐫 😖 💻 🔫 🦓 🐒 
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
              title="Demo - Inquiry"
              subheader="(+43% Income | +12% Expense) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    type: 'Week',
                    data: [
                      {
                        name: 'Inquiry',
                        data: [10, 41, 35, 151, 49, 62, 69, 91, 48],
                      },
                      {
                        name: 'Demo',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45],
                      },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      {
                        name: 'Inquiry',
                        data: [148, 91, 69, 62, 49, 51, 35, 41, 10],
                      },
                      {
                        name: 'Demo',
                        data: [45, 77, 99, 88, 77, 56, 13, 34, 10],
                      },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      {
                        name: 'Inquiry',
                        data: dd,
                      },
                      {
                        name: 'Demo',
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
              title="Student Attendance"
              total={2324}
              chart={{
                series: [
                  { label: 'Present', value: 44 },
                  { label: 'Late', value: 75 },
                  { label: 'Absent', value: 75 },
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
              title="All Courses"
              chart={{
                series: [
                  { label: 'Full-Stack', value: 14 },
                  { label: 'Flutter', value: 23 },
                  { label: 'Ui/Ux Designer', value: 21 },
                  { label: 'C Programing', value: 17 },
                  { label: 'C++ Programing', value: 15 },
                  { label: 'CCC Language', value: 10 },
                  { label: 'Web Designer', value: 12 },
                  { label: 'Digital Marketing', value: 17 },
                  { label: 'Coming Soon', value: 21 },
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
