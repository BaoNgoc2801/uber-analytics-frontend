import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../services/dashboardApi';

type HealthStatus = 'checking' | 'online' | 'offline';

export function useHealthCheck(intervalMs = 30000) {
  const [status, setStatus] = useState<HealthStatus>('checking');

  const check = useCallback(async () => {
    try {
      const res = await dashboardApi.checkHealth();
      setStatus(res.success ? 'online' : 'offline');
    } catch {
      setStatus('offline');
    }
  }, []);

  useEffect(() => {
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [check, intervalMs]);

  return status;
}
