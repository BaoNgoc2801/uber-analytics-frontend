import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type {  KpiSummary, DashboardFilters  } from '../types/dashboard';

export const useKpiSummary = (filters?: DashboardFilters) => {
  return useApi<KpiSummary>(() => dashboardApi.getKpiSummary(filters), [filters]);
};
