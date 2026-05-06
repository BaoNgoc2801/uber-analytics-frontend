import api from './api';
import type {
  ApiResponse,
  FilterOptions,
  KpiSummary,
  StatusBreakdown,
  BookingsByDay,
  RevenueByVehicle,
  CancellationReason,
  PickupHotspot,
  TopLocation,
  DashboardFilters,
} from '../types/dashboard';

const buildQueryParams = (filters?: DashboardFilters, extraParams?: Record<string, string | number>) => {
  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
  }

  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }

  return params;
};

export const dashboardApi = {
  checkHealth: async (): Promise<ApiResponse<{ status: string }>> => {
    const response = await api.get<ApiResponse<{ status: string }>>('/health');
    return response.data;
  },

  getFilters: async (): Promise<ApiResponse<FilterOptions>> => {
    const response = await api.get<ApiResponse<FilterOptions>>('/filters/options');
    return response.data;
  },

  getKpiSummary: async (filters?: DashboardFilters): Promise<ApiResponse<KpiSummary>> => {
    const params = buildQueryParams(filters);
    const response = await api.get<ApiResponse<KpiSummary>>('/kpi/summary', { params });
    return response.data;
  },

  getStatusBreakdown: async (filters?: DashboardFilters): Promise<ApiResponse<StatusBreakdown[]>> => {
    const params = buildQueryParams(filters);
    const response = await api.get<ApiResponse<StatusBreakdown[]>>('/chart/status-breakdown', { params });
    return response.data;
  },

  getBookingsByDay: async (filters?: DashboardFilters): Promise<ApiResponse<BookingsByDay[]>> => {
    const params = buildQueryParams(filters);
    const response = await api.get<ApiResponse<BookingsByDay[]>>('/chart/bookings-by-day', { params });
    return response.data;
  },

  getRevenueByVehicle: async (filters?: DashboardFilters): Promise<ApiResponse<RevenueByVehicle[]>> => {
    const params = buildQueryParams(filters);
    const response = await api.get<ApiResponse<RevenueByVehicle[]>>('/chart/revenue-by-vehicle', { params });
    return response.data;
  },

  getCancellationReasons: async (
    reasonType: 'customer' | 'driver' | 'incomplete',
    limit: number = 5,
    filters?: DashboardFilters
  ): Promise<ApiResponse<CancellationReason[]>> => {
    const params = buildQueryParams(filters, { reason_type: reasonType, limit });
    const response = await api.get<ApiResponse<CancellationReason[]>>('/chart/cancellation-reasons', { params });
    return response.data;
  },

  getPickupHotspots: async (filters?: DashboardFilters): Promise<ApiResponse<PickupHotspot[]>> => {
    const params = buildQueryParams(filters);
    const response = await api.get<ApiResponse<PickupHotspot[]>>('/map/pickup-hotspots', { params });
    return response.data;
  },

  getTopLocations: async (
    mode: 'pickup' | 'drop',
    limit: number = 10,
    filters?: DashboardFilters
  ): Promise<ApiResponse<TopLocation[]>> => {
    const params = buildQueryParams(filters, { mode, limit });
    const response = await api.get<ApiResponse<TopLocation[]>>('/table/top-locations', { params });
    return response.data;
  },
};
