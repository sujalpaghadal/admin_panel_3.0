import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

export default function DashboardUpcomingDemo({ title, subheader, list, ...other }) {
  console.log(list,"listing");
  const router = useRouter()
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button
            onClick={() => router.push(paths.dashboard.demo.root)}
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          >
            View All
          </Button>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {list.map((contact) => (
          <Stack direction="row" alignItems="center" key={contact.id}>
            <Avatar src={contact.avatarUrl} sx={{ width: 48, height: 48, mr: 2 }}>
              {contact?.firstName?.charAt(0).toUpperCase()}
            </Avatar>

            {/* <ListItemText primary={contact.name} secondary={contact.email} /> */}
            <ListItemText primary={'Heet Timbadiya'} secondary={'Full-Stack'} />

            <Box sx={{ fontSize: '15px' }}>8140724110</Box>
            {/* <Tooltip title="Quick Transfer">
              <IconButton>
                <Iconify icon="eva:diagonal-arrow-right-up-fill" />
              </IconButton>
            </Tooltip> */}
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

DashboardUpcomingDemo.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
