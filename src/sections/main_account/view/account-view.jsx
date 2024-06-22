import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _bookings, _bookingNew, _bookingReview, _bookingsOverview } from 'src/_mock';
import {
  BookingIllustration,
  CheckInIllustration,
  CheckoutIllustration,
} from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import AccountWidgetSummary from '../account-widget-summary';
import AccountCheckInWidgets from '../account-check-in-widgets';

// ----------------------------------------------------------------------

const SPACING = 3;

export default function AccountView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={8}>
          <AccountCheckInWidgets
            chart={{
              series: [
                { label: 'Sold', percent: 72, total: 38566 },
                { label: 'Pending for payment', percent: 64, total: 18472 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AccountWidgetSummary
            title="Total Booking"
            total={714000}
            icon={<BookingIllustration />}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AccountWidgetSummary title="Sold" total={311000} icon={<CheckInIllustration />} />
        </Grid>
        <Grid xs={12} md={4}>
          <AccountWidgetSummary title="Canceled" total={124000} icon={<CheckoutIllustration />} />
        </Grid>
      </Grid>
    </Container>
  );
}
