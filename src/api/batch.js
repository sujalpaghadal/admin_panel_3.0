import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';
import { useAuthContext } from 'src/auth/hooks';

export function useGetBatches() {
  const { user } = useAuthContext();
  const { company_id } = user;
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/company/${company_id}/batch`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      batch: data?.data || [],
      batchLoading: isLoading,
      batchError: error,
      batchValidating: isValidating,
      batchEmpty: !isLoading && !data?.data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function useGetSingleBatches(SingleBatchID) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/batch/${SingleBatchID}`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      Singlebatch: data?.data || [],
      SinglebatchLoading: isLoading,
      SinglebatchError: error,
      SinglebatchValidating: isValidating,
      SinglebatchEmpty: !isLoading && !data?.data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
