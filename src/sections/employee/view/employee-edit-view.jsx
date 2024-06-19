import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EmployeeNewEditForm from '../employee-new-edit-form';

// ----------------------------------------------------------------------

export default function EmployeeEditView({ id }) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Employee',
            href: paths.dashboard.employee.list,
          },
          { name: 'Employee Edit'},
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EmployeeNewEditForm employeeId={id} />
    </Container>
  );
}

EmployeeEditView.propTypes = {
  id: PropTypes.string,
};
