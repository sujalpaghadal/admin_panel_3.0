import useSWR from 'swr';
import { useMemo } from 'react';

import axios from 'axios';
import { fetcher } from '../utils/axios';
import { useAuthContext } from '../auth/hooks';

export function useGetAllAttendance() {
  const { user } = useAuthContext();
  const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/attendance`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);


  const memoizedValue = useMemo(() => {
    
    const attendance = data?.attendance || [];

    return {
      attendance,
      attendanceLoading: isLoading,
      attendanceError: error,
      attendanceValidating: isValidating,
      attendanceEmpty: !isLoading && attendance.length === 0,
      mutate,
    };
  }, [data, isLoading, error, isValidating, mutate]);

  return memoizedValue;
}

export async function useGetAttendanceAdd(postData) {
  try {
    const URL = `${import.meta.env.VITE_AUTH_API}/api/company/attendance`;
    const response = await axios.post(URL, postData);
    return response;
  } catch (error) {
    console.error('Error adding attendance:', error);
    throw error;
  }
}
