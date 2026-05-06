import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type {  PickupHotspot, DashboardFilters  } from '../types/dashboard';

export const usePickupHotspots = (filters?: DashboardFilters) => {
  return useApi<PickupHotspot[]>(() => dashboardApi.getPickupHotspots(filters), [filters]);
};
