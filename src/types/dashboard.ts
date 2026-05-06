export interface KpiSummary {
  total_bookings: number;
  completed_rides: number;
  completion_rate: number;
  cancelled_by_customer: number;
  cancelled_by_driver: number;
  no_driver_found: number;
  no_driver_found_rate: number;
  incomplete_rides: number;
  incomplete_ride_rate: number;
  total_booking_value: number;
  average_booking_value: number;
  average_ride_distance: number;
  average_vtat: number;
  average_ctat: number;
  average_driver_rating: number;
  average_customer_rating: number;
}

export interface StatusBreakdown {
  booking_status: string;
  booking_count: number;
  percentage: number;
}

export interface BookingsByDay {
  date: string;
  total_bookings: number;
}

export interface RevenueByVehicle {
  vehicle_type: string;
  booking_count: number;
  total_booking_value: number;
  average_booking_value: number;
}

export interface CancellationReason {
  reason: string;
  count: number;
  percentage: number;
}

export interface PickupHotspot {
  location_name: string;
  booking_count: number;
  total_booking_value: number;
  average_ride_distance: number;
}

export interface TopLocation {
  location_name: string;
  booking_count: number;
  total_value: number;
  average_ride_distance: number;
}

export interface FilterOptions {
  vehicle_types: string[];
  statuses: string[];
  locations: string[];
  payment_methods: string[];
}

export interface DashboardFilters {
  start_date?: string;
  end_date?: string;
  vehicle_type?: string;
  booking_status?: string;
  pickup_location?: string;
  drop_location?: string;
  payment_method?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
