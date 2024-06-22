import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';
import { useAuthContext } from '../auth/hooks/index.js';

export function useGetStudents(page, limit) {
  const { user } = useAuthContext();

  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/${user.company_id}/student`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      students: data?.students || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
      studentsEmpty: !isLoading && !data?.students.length,
    }),
    [data?.students, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetStudentsList(id) {
  const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/v2/${id}/student-list`;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      students: data?.students || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
      studentsEmpty: !isLoading && !data?.students.length,
    }),
    [data?.students, error, isLoading, isValidating]
  );
  return memoizedValue;
}
