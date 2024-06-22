import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';

export function useGetConfigs() {
  const { user } = useAuthContext();
  const URL = `${import.meta.env.VITE_AUTH_API}/api/company/${user.company_id}/configs`;
  const { data, error, isValidating, mutate } = useSWR(URL, fetcher);
  console.log(data);

  if (error) {
    console.error('Error fetching data:', error);
  }

  const memoizedValue = useMemo(() => {
    const configs = data?.data.data[0] || [];
    const isLoading = !data && !error;
    return {
      configs,
      configsLoading: isLoading,
      configsError: error,
      configsValidating: isValidating,
      configsEmpty: !isLoading && configs.length === 0,
      mutate,
    };
  }, [data, error, isValidating, mutate]);

  return memoizedValue;
}
