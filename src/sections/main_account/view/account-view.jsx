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
import { useGetAccount } from 'src/api/account';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const SPACING = 3;

export default function AccountView() {
  const theme = useTheme();
  const settings = useSettingsContext();

  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const { data } = useGetAccount(startDate, endDate);

  useEffect(() => {
    setStartDate(today);
    setEndDate(today);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={12} md={8} lg={8}>
          <AccountSalesOverview title="Sales Overview" data={_ecommerceSalesOverview} />
        </Grid>
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
      </Grid>
    </Container>
  );
}
