import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type {  TopLocation, DashboardFilters  } from '../types/dashboard';

export const useTopLocations = (
  mode: 'pickup' | 'drop',
  limit: number = 10,
  filters?: DashboardFilters
) => {
  return useApi<TopLocation[]>(() => dashboardApi.getTopLocations(mode, limit, filters), [
    mode,
    limit,
    filters,
  ]);
};
