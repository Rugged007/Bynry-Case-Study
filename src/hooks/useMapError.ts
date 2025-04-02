import { useState, useCallback } from 'react';

interface MapError {
  type: 'LOAD_ERROR' | 'API_ERROR' | 'INVALID_ADDRESS' | 'LOCATION_ERROR' | 'SCRIPT_ERROR';
  message: string;
}

export const useMapError = () => {
  const [error, setError] = useState<MapError | null>(null);

  const handleMapError = useCallback((type: MapError['type'], message: string) => {
    setError({ type, message });
    console.error(`Map Error (${type}):`, message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleMapError,
    clearError
  };
}; 