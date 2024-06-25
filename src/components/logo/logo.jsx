import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { RouterLink } from 'src/routes/components';
import logo1 from '../../../public/logo/jbs.png';
import { useGetConfigs } from 'src/api/config';
// ----------------------------------------------------------------------
const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();
  const { configs } = useGetConfigs();
  const [company,setCompany] = useState({}) 
  useEffect(() => {
setCompany(configs)
  },[configs])
  const logo1 = `${company?.company_details?.logo}`;
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 90,
        height: 90,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img src={logo1} alt={logo1} />
    </Box>
  );
  if (disabledLink) {
    return logo;
  }
  return (
    <Link sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});
Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};
export default Logo;
