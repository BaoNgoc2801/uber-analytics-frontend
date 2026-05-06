import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type {  FilterOptions  } from '../types/dashboard';

export const useFilters = () => {
  return useApi<FilterOptions>(dashboardApi.getFilters);
};
