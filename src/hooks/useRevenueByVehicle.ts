import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type {  RevenueByVehicle, DashboardFilters  } from '../types/dashboard';

export const useRevenueByVehicle = (filters?: DashboardFilters) => {
  return useApi<RevenueByVehicle[]>(() => dashboardApi.getRevenueByVehicle(filters), [filters]);
};
