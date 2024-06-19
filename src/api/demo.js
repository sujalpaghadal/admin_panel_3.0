import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';
import { useAuthContext } from 'src/auth/hooks';

export function useGetAllDemos(page, limit) {
  const { user } = useAuthContext();
  const { company_id } = user;
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/${company_id}/demo`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const demo = data?.data || [];
  const memoizedValue = useMemo(
    () => ({
      demo: demo,
      demoLoading: isLoading,
      demoError: error,
      demoValidating: isValidating,
      demoEmpty: !isLoading && !demo.length,
    }),
    [demo, error, isLoading, isValidating]
  );

  return memoizedValue;
}
