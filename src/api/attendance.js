import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';

export function useGetCompanyAttendance() {

  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/664ec61d671bf9a7f53664b5/attendance`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => {
      const attendance = data?.attendance || [];
      return {
        attendance,
        attendanceLoading: isLoading,
        attendanceError: error,
        attendanceValidating: isValidating,
        attendanceEmpty: !isLoading && attendance.length === 0,
      };
    },
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}
