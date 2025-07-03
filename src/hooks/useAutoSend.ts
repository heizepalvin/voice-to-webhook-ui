
import { useState, useCallback } from 'react';

export const useAutoSend = () => {
  const [autoSendEnabled, setAutoSendEnabled] = useState(false);

  const toggleAutoSend = useCallback(() => {
    setAutoSendEnabled(prev => !prev);
  }, []);

  return {
    autoSendEnabled,
    toggleAutoSend
  };
};
