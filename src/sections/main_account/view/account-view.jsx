import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import {
  _bookings,
  _bookingNew,
  _bookingReview,
  _bookingsOverview,
  _ecommerceSalesOverview,
  _appAuthors,
  _appInvoices,
} from 'src/_mock';
import {
  BookingIllustration,
  CheckInIllustration,
  CheckoutIllustration,
} from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import AccountWidgetSummary from '../account-widget-summary';
import AccountCheckInWidgets from '../account-check-in-widgets';
import AccountSalesOverview from '../account-sales-overview';
import AccountTotalIncomes from '../account-total-incomes';
import AccountTopAuthors from '../account-top-authors';
import AccountCurrentDownload from '../account-current-download';
import AccountNewInvoice from '../account-new-invoice';

// ----------------------------------------------------------------------

const SPACING = 3;

export default function AccountView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        {/* <Grid xs={8}>
          <AccountCheckInWidgets
            chart={{
              series: [
                { label: 'Sold', percent: 72, total: 38566 },
                { label: 'Pending for payment', percent: 64, total: 18472 },
              ],
            }}
          />
        </Grid> */}
        <Grid xs={12} md={8} lg={8}>
          <AccountSalesOverview title="Sales Overview" data={_ecommerceSalesOverview} />
        </Grid>
        {/* <Grid xs={12} md={4}>
          <AccountTotalIncomes
            title="Total Incomes"
            total={18765}
            percent={2.6}
            chart={{
              series: [
                { x: 2016, y: 111 },
                { x: 2017, y: 136 },
                { x: 2018, y: 76 },
                { x: 2019, y: 108 },
                { x: 2020, y: 74 },
                { x: 2021, y: 54 },
                { x: 2022, y: 57 },
                { x: 2023, y: 84 },
              ],
            }}
          />
        </Grid> */}
        <Grid xs={12} md={4}>
          <AccountWidgetSummary
            title="Total Booking"
            total={714000}
            icon={<BookingIllustration />}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AccountCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} lg={8}>
          <AccountNewInvoice
            title="New Invoice"
            tableData={_appInvoices}
            tableLabels={[
              { id: 'id', label: 'Invoice ID' },
              { id: 'category', label: 'Category' },
              { id: 'price', label: 'Price' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>
        {/* <Grid xs={12} md={6} lg={4}>
          <AccountTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid> */}
        {/* <Grid xs={12} md={4}>
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
        </Grid> */}
      </Grid>
    </Container>
  );
}
