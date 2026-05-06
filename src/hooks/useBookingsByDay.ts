import { useApi } from './useApi';
import { dashboardApi } from '../services/dashboardApi';
import type { BookingsByDay, DashboardFilters } from '../types/dashboard';

export const useBookingsByDay = (filters?: DashboardFilters) => {
  return useApi<BookingsByDay[]>(() => dashboardApi.getBookingsByDay(filters), [filters]);
};
