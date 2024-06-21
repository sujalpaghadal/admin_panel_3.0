import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
import axios from 'axios';
import { fetcher } from '../utils/axios';
import { useAuthContext } from 'src/auth/hooks';

// Hook to get all demos
export function useGetAllDemos(page, limit) {
  const { user } = useAuthContext();
  const { company_id } = user;
  const DemoURL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/${company_id}/demo`;
  const { data, isLoading, error, isValidating, mutate } = useSWR(DemoURL, fetcher);
  const demo = data?.data || [];
  const memoizedValue = useMemo(
    () => ({
      demo: demo,
      demoLoading: isLoading,
      demoError: error,
      demoValidating: isValidating,
      demoEmpty: !isLoading && !demo.length,
      mutate,
    }),
    [demo, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}

// Hook to delete a demo
export async function useDeleteDemo(deleteID) {
  const deleteURL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/demo/${deleteID}`;
  try {
    await axios.delete(deleteURL);
    mutate(deleteURL);
  } catch (error) {
    console.error('Error deleting event:', error);
  }
}

// Hook to edit a demo
export async function useEditDemo(payload, demoID) {
  const demoEditURL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/demo/${demoID}`;
  try {
    const response = await axios.put(demoEditURL, payload);
    mutate(demoEditURL);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}
