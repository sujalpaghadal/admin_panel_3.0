import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useAuthContext } from '../auth/hooks/index.js';

export function useGetCompanyAttendance() {

  const { user } = useAuthContext();

  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/${user?.company_id}/attendance`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(() => {
    const attendance = data?.attendance || [];
    return {
      attendance,
      attendanceLoading: isLoading,
      attendanceError: error,
      attendanceValidating: isValidating,
      attendanceEmpty: !isLoading && attendance.length === 0,
    };
  }, [data, isLoading, error, isValidating]);

  return memoizedValue;
}

export async function useGetAttendanceAdd(postData) {
  try {
    const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/attendance`;
    const response = await axios.post(URL, postData);
    return response;
  } catch (error) {
    console.error('Error adding attendance:', error);
    throw error;
  }
}
