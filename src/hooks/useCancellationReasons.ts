import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type {  CancellationReason, DashboardFilters  } from '../types/dashboard';

export const useCancellationReasons = (
  reasonType: 'customer' | 'driver' | 'incomplete',
  limit: number = 5,
  filters?: DashboardFilters
) => {
  return useApi<CancellationReason[]>(
    () => dashboardApi.getCancellationReasons(reasonType, limit, filters),
    [reasonType, limit, filters]
  );
};
