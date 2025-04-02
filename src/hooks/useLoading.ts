import { useState, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  message: string;
}

export const useLoading = (initialMessage: string = '') => {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    message: initialMessage
  });

  const startLoading = useCallback((message?: string) => {
    setState({
      isLoading: true,
      message: message || initialMessage
    });
  }, [initialMessage]);

  const stopLoading = useCallback(() => {
    setState({
      isLoading: false,
      message: ''
    });
  }, []);

  const setLoadingMessage = useCallback((message: string) => {
    setState(prev => ({
      ...prev,
      message
    }));
  }, []);

  return {
    isLoading: state.isLoading,
    loadingMessage: state.message,
    startLoading,
    stopLoading,
    setLoadingMessage
  };
}; 