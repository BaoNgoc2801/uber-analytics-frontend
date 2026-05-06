import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type {  StatusBreakdown, DashboardFilters  } from '../types/dashboard';

export const useStatusBreakdown = (filters?: DashboardFilters) => {
  return useApi<StatusBreakdown[]>(() => dashboardApi.getStatusBreakdown(filters), [filters]);
};
